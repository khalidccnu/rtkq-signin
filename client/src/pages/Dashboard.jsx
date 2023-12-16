import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaSignOutAlt, FaTrash, FaUpload } from "react-icons/fa";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { TbReplaceFilled } from "react-icons/tb";
import { removeUser } from "../redux/auth/authSlice.js";
import { useSignOutMutation } from "../redux/auth/authAPI.js";
import imgPlaceholder from "../assets/img-placeholder.jpg";

const Dashboard = () => {
  const [signOut] = useSignOutMutation();
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const formik = useFormik({
    initialValues: {
      photos: null,
    },
  });

  const handleDeletePhoto = (idx) => {
    const tempImages = [...images.slice(0, idx), ...images.slice(idx + 1)];

    const dataTransfer = new DataTransfer();

    for (const image of tempImages) dataTransfer.items.add(image);

    formik.setFieldValue("photos", dataTransfer.files);
    setImages(tempImages);
  };

  const handleChangePhoto = (idx, newImage) => {
    const newImages = [...images];
    newImages[idx] = newImage;

    const dataTransfer = new DataTransfer();

    for (const image of newImages) dataTransfer.items.add(image);

    formik.setFieldValue("photos", dataTransfer.files);
    setImages(newImages);
  };

  useEffect(() => {
    if (formik.values.photos?.length) {
      const arr = Array.from(formik.values.photos);

      setImages(arr);
    }
  }, [formik.values.photos]);

  return (
    <section className={`py-10`}>
      <div className="container">
        <div className={`text-end`}>
          <Link
            to={`/`}
            className={`inline-flex bg-green-600 text-white hover:bg-transparent hover:text-green-600 border border-green-600 px-3 py-1 rounded cursor-pointer transition-colors duration-500`}
            onClick={() => {
              signOut();
              dispatch(removeUser());
            }}
          >
            <FaSignOutAlt />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 max-w-xl w-full mx-auto">
          <div className={`relative`}>
            <div className="swiper-controller absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-between w-full px-4 z-10">
              <div className="swiper-db-button-prev flex justify-center items-center bg-green-600 text-white w-6 h-6 rounded-full cursor-pointer">
                <MdOutlineKeyboardArrowLeft />
              </div>
              <div className="swiper-db-button-next flex justify-center items-center bg-green-600 text-white w-6 h-6 rounded-full cursor-pointer">
                <MdOutlineKeyboardArrowRight />
              </div>
            </div>
            <Swiper
              modules={[Navigation]}
              navigation={{
                enabled: true,
                prevEl: ".swiper-db-button-prev",
                nextEl: ".swiper-db-button-next",
                disabledClass: "swiper-db-button-disabled",
              }}
              slidesPerView={1}
              spaceBetween={50}
            >
              {images.length ? (
                images?.map((image, idx) => (
                  <SwiperSlide key={idx}>
                    <div className={`relative`}>
                      <div className={`absolute top-3 right-3 space-x-1.5`}>
                        <label className="relative btn btn-sm bg-green-600 hover:bg-transparent text-white hover:text-green-600 !border-green-600 normal-case rounded">
                          <TbReplaceFilled />
                          <input
                            type="file"
                            className="absolute left-0 top-0  overflow-hidden h-0"
                            onChange={(e) =>
                              handleChangePhoto(idx, e.currentTarget.files[0])
                            }
                          />
                        </label>
                        <button
                          className="btn btn-sm bg-red-600 hover:bg-transparent text-white hover:text-red-600 !border-red-600 normal-case rounded"
                          onClick={() => handleDeletePhoto(idx)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                      <img
                        key={idx}
                        src={URL.createObjectURL(image)}
                        alt=""
                        className={`w-full h-96 object-cover rounded`}
                      />
                    </div>
                  </SwiperSlide>
                ))
              ) : (
                <img
                  src={imgPlaceholder}
                  alt=""
                  className={`w-full h-96 object-cover rounded`}
                />
              )}
            </Swiper>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <label className="relative input input-md input-bordered flex items-center border-gray-500/50 rounded focus-within:outline-0 bg-transparent">
              {formik.values.photos?.length ? (
                <span>{formik.values.photos.length + " files"}</span>
              ) : (
                <span className={`flex items-baseline space-x-1.5`}>
                  <FaUpload />
                  <span>Choose photos</span>
                </span>
              )}
              <input
                type="file"
                multiple
                name="photos"
                className="absolute left-0 top-0  overflow-hidden h-0"
                onChange={(e) =>
                  formik.setFieldValue("photos", e.currentTarget.files)
                }
                onBlur={formik.handleBlur}
              />
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
