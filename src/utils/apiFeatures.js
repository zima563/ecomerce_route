export class ApiFeatures {
  constructor(mongooseQuery, searchQuery) {
    this.mongooseQuery = mongooseQuery;
    this.searchQuery = searchQuery;
  }

  //   pagination() {
  //     if (this.searchQuery.page <= 0) return (this.searchQuery.page = 1);
  //     let page = this.searchQuery.page * 1 || 1;
  //     let limit = this.searchQuery.limit;
  //     let skip = (page - 1) * limit;
  //     this.mongooseQuery.skip(skip).limit(limit);
  //     return this;
  //   }

  filter() {
    let filterObj = { ...this.searchQuery };
    let excludedFields = ["page", "sort", "limit", "fields", "keyword"];
    excludedFields.forEach((val) => {
      delete filterObj[val];
    });

    filterObj = JSON.stringify(filterObj);
    filterObj = filterObj.replace(/(gt|gte|lt|lte)/g, (match) => "$" + match);
    filterObj = JSON.parse(filterObj);
    this.mongooseQuery.find(filterObj);
    return this;
  }

  sort() {
    if (this.searchQuery.sort) {
      let sortBy = this.searchQuery.sort.split(",").join(" ");
      this.mongooseQuery.sort(sortBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("-createAt");
    }
    return this;
  }

  limitedFields() {
    if (this.searchQuery.fields) {
      let fields = this.searchQuery.fields.split(",").join(" ");
      this.mongooseQuery.select(fields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select("-__v");
    }
    return this;
  }

  search(modelName) {
    if (this.searchQuery.keyword) {
      let query = {};
      if (modelName === "product") {
        query.$or = [
          { title: { $regex: this.searchQuery.keyword, $options: "i" } },
          { description: { $regex: this.searchQuery.keyword, $options: "i" } },
        ];
      } else {
        query = { name: { $regex: this.searchQuery.keyword, $options: "i" } };
      }
      if (!this.mongooseQuery) {
        this.mongooseQuery = this.modelName.find();
      }

      this.mongooseQuery = this.mongooseQuery.find(query);
    }
    return this;
  }
  paginate(countDocuments) {
    const page = this.searchQuery.page * 1 || 1;
    const limit = this.searchQuery.limit * 1 || 50;
    const skip = (page - 1) * limit;
    const endIndex = page * limit;

    // Pagination result
    const pagination = {};
    pagination.currentPage = page;
    pagination.limit = limit;
    pagination.numberOfPages = Math.ceil(countDocuments / limit);

    // next page
    if (endIndex < countDocuments) {
      pagination.next = page + 1;
    }
    if (skip > 0) {
      pagination.prev = page - 1;
    }
    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);

    this.paginationResult = pagination;
    return this;
  }
}
