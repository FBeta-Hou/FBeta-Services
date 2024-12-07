const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    Tinh_Thanh_Pho: {
        type: String,
        required: true
    },
    Dia_Chi_Chi_Tiet: {
        type: String,
        required: true
    },
    Ten_Khu_Di_Tan: {
        type: String,
        required: true
    },
    Suc_Chua_Toi_Da: {
        type: Number,
        required: true
    },
    So_Nguoi_Hien_Tai: {
        type: Number,
        required: true
    },
    Created_And_Updated_At: {
        type: Date,
        required: true,
        default: Date.now
    },
    So_Dien_Thoai_Nguoi_Phu_Trach: {
        type: Number,
        required: true
    },
    Trang_Thai: {
        type: String,
        required: true,
        enum: ['Chờ', 'Hoạt Động', 'Chờ Hoạt Động']
    },
})

const Location = mongoose.model("Location", locationSchema, "locations");

module.exports = Location;
