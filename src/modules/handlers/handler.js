import slugify from "slugify";
import { catchError } from "../../middleware/catchError.js";
import { apiError } from "../../utils/apiError.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";
import { reviewModel } from "../../../databases/models/reviewModel.js";

export const deleteOne = (model) => {
  return catchError(async (req, res, next) => {
    let document = await model.findByIdAndDelete(req.params.id);
    !document && next(new apiError("not document found", 404));
    document && res.json({ msg: "success", document });
  });
};

export const updateOne = (model) => {
  return catchError(async (req, res, next) => {
    if (req.body.title) req.body.slug = slugify(req.body.title);
    if (req.body.name) req.body.slug = slugify(req.body.name);
    if (req.files?.imgCover) {
      req.body.imgCover = req.files.imgCover[0].filename;
    }
    if (req.files?.images) {
      req.body.images = req.files.images.map((val) => val.filename);
    }
    if (model == reviewModel) {
      let document = await model.findOneAndUpdate(
        { _id: req.params.id, user: req.user._id },
        req.body,
        {
          new: true,
        }
      );
      !document && next(new apiError("not document found", 404));
      document && res.json({ msg: "success", document });
    }
    let document = await model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    !document && next(new apiError("not document found", 404));
    document && res.json({ msg: "success", document });
  });
};

export const addOne = (model) => {
  return catchError(async (req, res, next) => {
    if (req.body.title) req.body.slug = slugify(req.body.title);
    if (req.body.name) req.body.slug = slugify(req.body.name);
    if (req.file) req.body.image = req.file.filename;

    if (req.files?.imgCover) req.body.imgCover = req.files.imgCover[0].filename;
    if (req.files?.images)
      req.body.images = req.files.images.map((val) => val.filename);
    if (model == reviewModel) req.body.user = req.user._id;
    let document = new model(req.body);

    await document.save();
    res.json({ msg: "success", document });
  });
};

export const getAll = (model, modelName) => {
  return catchError(async (req, res, next) => {
    let filterObj = {};
    if (req.params.category) {
      filterObj.category = req.params.category;
    }
    let countDocuments = await model.countDocuments();
    let apiFeatures = new ApiFeatures(model.find(filterObj), req.query)
      .paginate(countDocuments)
      .filter()
      .sort()
      .search(modelName)
      .limitedFields();

    const { mongooseQuery, paginationResult } = apiFeatures;
    let document = await mongooseQuery;
    res.json({ msg: "success", paginationResult, document });
  });
};

export const getOne = (model) => {
  return catchError(async (req, res, next) => {
    let document = await model.findById(req.params.id);
    !document && next(new apiError("not document found", 404));
    document && res.json({ msg: "success", document });
  });
};
