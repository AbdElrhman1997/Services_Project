import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { AppContext } from "../Contexts/AppContext";

const PostCard = ({ service }) => {
  const media = service?.media || []; // Assuming media is an array of image URLs
  const { t } = useTranslation();
  const { orderPhone } = useContext(AppContext);

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-sm relative cursor-pointer hover:bg-gray-50 transition duration-200">
      {/* Image Grid */}
      {media?.length > 0 && (
        <div
          className={`grid grid-cols-1 md:grid-cols-2 ${
            media.length > 2 ? "lg:grid-cols-3" : ""
          } gap-2`}
        >
          {/* {media?.map((image, index) => (
            <img
              key={index}
              src={`${process.env.REACT_APP_MAIN_URL}/storage/${image}`}
              alt={`Image ${index + 1}`}
              className="w-full h-48 object-cover rounded-lg"
            />
          ))} */}
        </div>
      )}

      {/* Service Name */}
      <div className="p-4">
        <p className="text-slate-800 font-bold text-xl mb-2">{service?.name}</p>

        {/* Price Section */}
        <div className="flex items-center mb-4">
          {service?.is_free ? (
            <p className="text-green-500 font-semibold text-lg">Free</p>
          ) : (
            <div className="flex items-center">
              <p className="text-lg font-bold text-[#2481ce]">
                {service?.price - (service?.price * service?.discount) / 100}{" "}
                {t("common.currency")}
              </p>
              {service?.discount > 0 && (
                <p className="text-gray-500 line-through ml-4">
                  {service?.price} {t("common.currency")}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Details */}
        <p className="text-gray-500 mb-4">{service?.details}</p>

        {/* WhatsApp Link */}
        <div className="border-t pt-4">
          <a
            href={`https://wa.me/${orderPhone}?text=${encodeURIComponent(
              `مرحبا : هل يمكنني طلب هذه الخدمة ${service?.name}`
            )}`}
            className="text-[#2481ce] hover:underline text-sm font-semibold"
            target="_blank"
          >
            {t("common.orderViaWhatsapp")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
