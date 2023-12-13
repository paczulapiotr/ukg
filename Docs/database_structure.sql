CREATE TABLE "ukg"
(
    "id" int IDENTITY(1,1) NOT NULL,
    "submitter_login" varchar
(255) NOT NULL,
    "PESEL" varchar
(255) NOT NULL,
    "submit_date" int
(12) NOT NULL,
    "imie_nazwisko" varchar
(255) NOT NULL,
    "wiek" varchar
(255) NOT NULL,
    "Ao" varchar
(255) NOT NULL,
    "ACS" varchar
(255) NOT NULL,
    "LA" varchar
(255) NOT NULL,
    "RV" varchar
(255) NOT NULL,
    "LVs" varchar
(255) NOT NULL,
    "LVd" varchar
(255) NOT NULL,
    "IVSs" varchar
(255) NOT NULL,
    "IVSd" varchar
(255) NOT NULL,
    "LVPWs" varchar
(255) NOT NULL,
    "LVPWd" varchar
(255) NOT NULL,
    "EF" varchar
(255) NOT NULL,
    "kurczliwosc" text NOT NULL,
    "osierdzie" text NOT NULL,
    "zastawka_mitralna" text NOT NULL,
    "doppler_mitralna" text NOT NULL,
    "Vmax_mitralna" varchar
(255) NOT NULL,
    "Gmax_mitralna" varchar
(255) NOT NULL,
    "zastawka_aortalna" text NOT NULL,
    "doppler_aortalna" text NOT NULL,
    "Vmax_aortalna" varchar
(255) NOT NULL,
    "Gmax_aortalna" varchar
(255) NOT NULL,
    "zastawka_trojdzielna" text NOT NULL,
    "doppler_trojdzielna" text NOT NULL,
    "Vmax_trojdzielna" varchar
(255) NOT NULL,
    "Gmax_trojdzielna" varchar
(255) NOT NULL,
    "zastawka_pnia" text NOT NULL,
    "doppler_pnia" text NOT NULL,
    "wnioski" text NOT NULL
);