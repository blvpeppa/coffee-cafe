import React from "react";
import n from '.././assets/notfound.jpg';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Notfound() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src={n}
          alt={t("notfound_image_alt")}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30" />
      </div>

      {/* Main content */}
      <main className="flex flex-1 items-center justify-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center max-w-md">
          <p className="text-base font-semibold text-green-600">404</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
            {t("notfound_title")}
          </h1>
          <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            {t("notfound_description")}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to='/'
              className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {t("notfound_home_button")}
            </Link>
            <Link to='/Contact' className="text-sm font-semibold text-gray-900">
              {t("notfound_contact_support")} <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
