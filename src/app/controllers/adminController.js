// const Course = require('../models/Course');
const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose')
const Product = require('../models/InforProductModels');

class AdminController {
    // [GET] //admin/product/create
    create(req, res, next) {

    }

    //[POST] //admin/product/stored
    stored(req, res, next) {
        const product = new Product(req.body);
        product.save()
            .then(() => {
                res.redirect('/admin/product/show')
            })
            .catch(error => {
                res.json({
                    messageError: "Có lỗi khi thêm sản phầm",
                    error: error
                })
            })
    }

    //[GET] /admin/product/show
    show(req, res, next) {
        Product.find()
            .then((products) => {
                res.json({
                    products: mutipleMongooseToObject(products)
                })
            })
            .catch((error) => {
                res.json({
                    messageError: "Có lỗi trong quá trình show",
                    error: error
                })
            })
    }

    //[GET] //admin/product/:id/edit
    edit(req, res, next) {
        Product.findById(req.params.id)
            .then((product) => {
                res.json({
                    product: mongooseToObject(product)
                })
            })
            .catch((error) => res.json({
                messageError: "Tìm kiếm thất bại",
                error: error
            }))
    }
    
    //[PUT] //admin/product/:id
    update(req,res,next){
        Product.updateOne({_id: req.params.id},req.body)
            .then(() => res.redirect('/admin/product/show'))
            .catch(error => res.json({
                messageError: "Cập nhật thất bại",
                error: error
            }))
    }

    //[DELETE] //admin/product/:id/force
    forceDelete(req, res, next) {
        Product.deleteOne({_id: req.params.id})
            .then(() => res.redirect('/admin/product/show'))
            .catch(error => res.json({
                messageError: "Xóa cứng thất bại",
                error: error
            }))
    }

    //[DELETE] //admin/product/:id
    delete(req, res, next) {
        Product.delete({_id: req.params.id})
            .then(() => res.redirect('/admin/product/show'))
            .catch(error => res.json({
                messageError: "Xóa mềm thất bại",
                error: error
            }))
    }

    //[PATCH] //admin/products/:id/restore
    restore(req, res, next) {
        Product.restore({_id: req.params.id})
            .then(() => res.redirect('/admin/product/show'))
            .catch(error => res.json({
                messageError: "Khôi phục thất bại",
                error: error
            }))
    }
}

module.exports = new AdminController();
