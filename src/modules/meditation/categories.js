require('dotenv').config();
const model = require('./model')
const path = require('path')
const FS = require('../../lib/fs/fs')

module.exports = {
   GET: async (req, res) => {
      try {
         const { lang } = req.query

         if (lang) {
            const categoriesListByLang = await model.categoriesListByLang(lang)

            if (categoriesListByLang?.length > 0) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: categoriesListByLang
               })
            } else {
               return res.status(404).json({
                  status: 404,
                  message: "Not found"
               })
            }

         } else {
            const categoriesList = await model.categoriesList()

            if (categoriesList?.length > 0) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: categoriesList
               })
            } else {
               return res.status(404).json({
                  status: 404,
                  message: "Not found"
               })
            }
         }

      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: 500,
            message: "Interval Server Error"
         })
      }
   },

   ADD_CATEGORY: async (req, res) => {
      try {
         const { category_name, category_lang } = req.body

         const addCategory = await model.addCategory(
            category_name,
            category_lang
         )

         if (addCategory) {
            return res.status(200).json({
               status: 200,
               message: "Success",
               data: addCategory
            })
         } else {
            return res.status(400).json({
               status: 400,
               message: "Bad request"
            })
         }

      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: 500,
            message: "Interval Server Error"
         })
      }
   },

   UPDATE_CATEGORY: async (req, res) => {
      try {
         const {
            category_id,
            category_name,
            category_lang
         } = req.body

         const foundCategory = await model.foundCategory(category_id)

         if (foundCategory) {
            const updateCategory = await model.updateCategory(
               category_id,
               category_name,
               category_lang
            )

            if (updateCategory) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: updateCategory
               })
            } else {
               return res.status(400).json({
                  status: 400,
                  message: "Bad request"
               })
            }

         } else {
            return res.status(404).json({
               status: 404,
               message: "Not found"
            })
         }

      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: 500,
            message: "Interval Server Error"
         })
      }
   },

   DELETE_CATEGORY: async (req, res) => {
      try {
         const { category_id } = req.body
         const foundCategory = await model.foundCategory(category_id)

         if (foundCategory) {
            const deleteCategory = await model.deleteCategory(category_id)

            if (deleteCategory) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: deleteCategory
               })
            } else {
               return res.status(400).json({
                  status: 400,
                  message: "Bad request"
               })
            }

         } else {
            return res.status(404).json({
               status: 404,
               message: "Not found"
            })
         }

      } catch (error) {
         console.log(error);
         res.status(500).json({
            status: 500,
            message: "Interval Server Error"
         })
      }
   }
}