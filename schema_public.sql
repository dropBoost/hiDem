


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE SCHEMA IF NOT EXISTS "public";


ALTER SCHEMA "public" OWNER TO "pg_database_owner";


COMMENT ON SCHEMA "public" IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."autista_camion_trasporto_veicoli" (
    "uuid_autista_ctv" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "nome_autista" "text",
    "cognome_autista" "text",
    "n_patente_autista" "text",
    "created_at_autista" timestamp with time zone DEFAULT "now"() NOT NULL,
    "attivo_autista" boolean,
    "email_autista" "text",
    "mobile_autista" "text"
);


ALTER TABLE "public"."autista_camion_trasporto_veicoli" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."azienda_ritiro_veicoli" (
    "uuid_azienda_ritiro_veicoli" "uuid" NOT NULL,
    "uuid_rules" "uuid",
    "ragione_sociale_arv" "text",
    "piva_arv" "text",
    "sdi_arv" "text",
    "cap_legale_arv" "text",
    "citta_legale_arv" "text",
    "provincia_legale_arv" "text",
    "indirizzo_legale_arv" "text",
    "cap_operativa_arv" "text",
    "citta_operativa_arv" "text",
    "provincia_operativa_arv" "text",
    "indirizzo_operativa_arv" "text",
    "email_arv" "text",
    "telefono_arv" "text",
    "mobile_arv" "text",
    "mobile_autista_arv" "text",
    "created_at_arv" timestamp with time zone DEFAULT "now"(),
    "attiva_arv" boolean,
    CONSTRAINT "azienda_ritiro_veicoli_piva_arv_check" CHECK (("char_length"("piva_arv") = 11))
);


ALTER TABLE "public"."azienda_ritiro_veicoli" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."camion_trasporto_veicoli" (
    "uuid_camion_trasporto_veicoli" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "targa_camion" "text",
    "created_at_camion_ritiro" timestamp with time zone DEFAULT "now"() NOT NULL,
    "marca_camion" "text",
    "modello_camion" "text",
    "attivo_camion" boolean
);


ALTER TABLE "public"."camion_trasporto_veicoli" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."certificato_demolizione" (
    "uuid_certificato_demolizione" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "uuid_veicolo_ritirato" "uuid",
    "documento_demolizione" "text",
    "altro_documento_demolizione" "text",
    "demolizione_completata" boolean,
    "created_at_certificato_demolizione" timestamp with time zone DEFAULT "now"(),
    "tipologia_demolizione" "text",
    "note_demolizione" "text"
);


ALTER TABLE "public"."certificato_demolizione" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."dati_veicolo_eliminato" (
    "uuid_veicolo_eliminato" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "uuid_azienda_ritiro_veicoli" "uuid",
    "uuid_modello_veicolo" "uuid",
    "anno_veicolo_ritirato" integer,
    "cilindrata_veicolo_ritirato" numeric,
    "vin_veicolo_ritirato" "text",
    "targa_veicolo_ritirato" "text",
    "km_veicolo_ritirato" numeric,
    "tipologia_detentore" "text",
    "forma_legale_detentore" "text",
    "ragione_sociale_detentore" "text",
    "cap_detentore" "text",
    "cognome_detentore" "text",
    "cf_detentore" "text",
    "piva_detentore" "text",
    "tipologia_documento_detentore" "text",
    "numero_documento_detentore" "text",
    "nazionalita_documento_detentore" "text",
    "email_detentore" "text",
    "mobile_detentore" "text",
    "tipologia_documento_veicolo_ritirato" "text",
    "foto_documento_veicolo_ritirato_f" "text",
    "foto_documento_detentore_f" "text",
    "created_at_veicolo_ritirato" timestamp with time zone DEFAULT "now"(),
    "provincia_detentore" "text",
    "indirizzo_detentore" "text",
    "nome_detentore" "text",
    "citta_detentore" "text",
    "foto_documento_veicolo_ritirato_r" "text",
    "foto_documento_detentore_r" "text",
    "uuid_ritiro" "uuid"
);


ALTER TABLE "public"."dati_veicolo_eliminato" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."dati_veicolo_ritirato" (
    "uuid_veicolo_ritirato" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "uuid_azienda_ritiro_veicoli" "uuid",
    "uuid_modello_veicolo" "uuid",
    "anno_veicolo_ritirato" integer,
    "cilindrata_veicolo_ritirato" numeric(4,0),
    "vin_veicolo_ritirato" "text",
    "targa_veicolo_ritirato" "text",
    "km_veicolo_ritirato" numeric(7,0),
    "tipologia_detentore" "text",
    "forma_legale_detentore" "text",
    "ragione_sociale_detentore" "text",
    "cap_detentore" "text",
    "cognome_detentore" "text",
    "cf_detentore" "text",
    "piva_detentore" "text",
    "tipologia_documento_detentore" "text",
    "numero_documento_detentore" "text",
    "nazionalita_documento_detentore" "text",
    "email_detentore" "text",
    "mobile_detentore" "text",
    "tipologia_documento_veicolo_ritirato" "text",
    "foto_documento_veicolo_ritirato_f" "text",
    "foto_documento_detentore_f" "text",
    "created_at_veicolo_ritirato" timestamp with time zone DEFAULT "now"(),
    "provincia_detentore" "text",
    "indirizzo_detentore" "text",
    "nome_detentore" "text",
    "citta_detentore" "text",
    "foto_documento_veicolo_ritirato_r" "text",
    "foto_documento_detentore_r" "text",
    "pratica_completata" boolean,
    "pratica_eliminata" boolean DEFAULT false,
    "uuid_camion_ritiro" "uuid",
    "demolizione_approvata" boolean,
    "veicolo_ritirato" boolean DEFAULT false,
    "vin_leggibile" boolean,
    "stato_gravami" "text",
    "foto_complementare_veicolo_ritirato_f" "text",
    "foto_complementare_veicolo_ritirato_r" "text",
    "veicolo_consegnato" boolean DEFAULT false,
    CONSTRAINT "dati_veicolo_ritirato_anno_veicolo_ritirato_check" CHECK (("anno_veicolo_ritirato" >= 1900)),
    CONSTRAINT "dati_veicolo_ritirato_cf_detentore_check" CHECK (("char_length"("cf_detentore") = 16)),
    CONSTRAINT "dati_veicolo_ritirato_piva_detentore_check" CHECK (("char_length"("piva_detentore") = 11)),
    CONSTRAINT "dati_veicolo_ritirato_targa_veicolo_ritirato_check" CHECK (("char_length"("targa_veicolo_ritirato") = 7)),
    CONSTRAINT "dati_veicolo_ritirato_vin_veicolo_ritirato_check" CHECK (("char_length"("vin_veicolo_ritirato") = 17))
);


ALTER TABLE "public"."dati_veicolo_ritirato" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."demolizione_parziale" (
    "uuid_certificato_demolizione" "uuid" NOT NULL
);


ALTER TABLE "public"."demolizione_parziale" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."demolizione_totale" (
    "uuid_certificato_demolizione" "uuid" NOT NULL
);


ALTER TABLE "public"."demolizione_totale" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."log_avanzamento_demolizione" (
    "uuid_log_avanzamento_demolizione" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "uuid_veicolo_ritirato" "uuid",
    "created_at_stato_avanzamento" timestamp with time zone DEFAULT "now"(),
    "uuid_stato_avanzamento" "uuid",
    "note_log_stato_avanzamento" "text"
);


ALTER TABLE "public"."log_avanzamento_demolizione" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."log_trasporto_veicolo" (
    "uuid_log_trasporto_veicolo" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "uuid_veicolo_ritirato" "uuid",
    "uuid_camion_tv" "uuid",
    "uuid_autista_ctv" "uuid",
    "created_at_log_trasporto_veicolo" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."log_trasporto_veicolo" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."modello_veicolo" (
    "uuid_modello_veicolo" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "modello" "text",
    "marca" "text",
    "created_at_modello_veicolo" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."modello_veicolo" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."rules_user" (
    "uuid_rules" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "alias_rules" "text",
    "created_at_rules" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."rules_user" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."stati_avanzamento" (
    "uuid_stato_avanzamento" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "alias_stato_avanzamento" "text",
    "codice_stato_avanzamento" "text",
    "created_at_stato_avanzamento" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."stati_avanzamento" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."stato_avanzamento_ritiro" (
    "uuid_ritiro_vo" "uuid",
    "uuid_richiesta_rv" "uuid",
    "targa_rv" "text",
    "alias_stato_avanzamento_rv" "text",
    "created_at_stato_avanzamento_rv" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."stato_avanzamento_ritiro" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."v_pratiche_aperte_per_azienda" AS
 SELECT "uuid_azienda_ritiro_veicoli",
    ("count"(*))::integer AS "pratiche_aperte"
   FROM "public"."dati_veicolo_ritirato"
  WHERE ("pratica_completata" = false)
  GROUP BY "uuid_azienda_ritiro_veicoli";


ALTER VIEW "public"."v_pratiche_aperte_per_azienda" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."vw_marche_uniche" AS
 SELECT DISTINCT TRIM(BOTH FROM "marca") AS "marca"
   FROM "public"."modello_veicolo"
  WHERE (("marca" IS NOT NULL) AND (TRIM(BOTH FROM "marca") <> ''::"text"));


ALTER VIEW "public"."vw_marche_uniche" OWNER TO "postgres";


ALTER TABLE ONLY "public"."autista_camion_trasporto_veicoli"
    ADD CONSTRAINT "autista_camion_trasporto_veicoli_pkey" PRIMARY KEY ("uuid_autista_ctv");



ALTER TABLE ONLY "public"."azienda_ritiro_veicoli"
    ADD CONSTRAINT "azienda_ritiro_veicoli_pkey" PRIMARY KEY ("uuid_azienda_ritiro_veicoli");



ALTER TABLE ONLY "public"."camion_trasporto_veicoli"
    ADD CONSTRAINT "camion_ritiro_pkey" PRIMARY KEY ("uuid_camion_trasporto_veicoli");



ALTER TABLE ONLY "public"."camion_trasporto_veicoli"
    ADD CONSTRAINT "camion_ritiro_targa_camion_key" UNIQUE ("targa_camion");



ALTER TABLE ONLY "public"."certificato_demolizione"
    ADD CONSTRAINT "certificato_demolizione_pkey" PRIMARY KEY ("uuid_certificato_demolizione");



ALTER TABLE ONLY "public"."dati_veicolo_eliminato"
    ADD CONSTRAINT "dati_veicolo_eliminato_pkey" PRIMARY KEY ("uuid_veicolo_eliminato");



ALTER TABLE ONLY "public"."dati_veicolo_ritirato"
    ADD CONSTRAINT "dati_veicolo_ritirato_pkey" PRIMARY KEY ("uuid_veicolo_ritirato");



ALTER TABLE ONLY "public"."demolizione_parziale"
    ADD CONSTRAINT "demolizione_parziale_pkey" PRIMARY KEY ("uuid_certificato_demolizione");



ALTER TABLE ONLY "public"."demolizione_totale"
    ADD CONSTRAINT "demolizione_totale_pkey" PRIMARY KEY ("uuid_certificato_demolizione");



ALTER TABLE ONLY "public"."log_trasporto_veicolo"
    ADD CONSTRAINT "log_trasporto_veicolo_pkey" PRIMARY KEY ("uuid_log_trasporto_veicolo");



ALTER TABLE ONLY "public"."modello_veicolo"
    ADD CONSTRAINT "modello_veicolo_pkey" PRIMARY KEY ("uuid_modello_veicolo");



ALTER TABLE ONLY "public"."rules_user"
    ADD CONSTRAINT "rules_user_pkey" PRIMARY KEY ("uuid_rules");



ALTER TABLE ONLY "public"."stati_avanzamento"
    ADD CONSTRAINT "stati_avanzamento_pkey" PRIMARY KEY ("uuid_stato_avanzamento");



ALTER TABLE ONLY "public"."log_avanzamento_demolizione"
    ADD CONSTRAINT "stato_avanzamento_demolizione_pkey" PRIMARY KEY ("uuid_log_avanzamento_demolizione");



ALTER TABLE ONLY "public"."azienda_ritiro_veicoli"
    ADD CONSTRAINT "arv_ru_fk" FOREIGN KEY ("uuid_rules") REFERENCES "public"."rules_user"("uuid_rules") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."certificato_demolizione"
    ADD CONSTRAINT "cd_dvr_fk" FOREIGN KEY ("uuid_veicolo_ritirato") REFERENCES "public"."dati_veicolo_ritirato"("uuid_veicolo_ritirato") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."dati_veicolo_eliminato"
    ADD CONSTRAINT "dati_veicolo_eliminato_uuid_azienda_ritiro_veicoli_fkey" FOREIGN KEY ("uuid_azienda_ritiro_veicoli") REFERENCES "public"."azienda_ritiro_veicoli"("uuid_azienda_ritiro_veicoli");



ALTER TABLE ONLY "public"."dati_veicolo_eliminato"
    ADD CONSTRAINT "dati_veicolo_eliminato_uuid_modello_veicolo_fkey" FOREIGN KEY ("uuid_modello_veicolo") REFERENCES "public"."modello_veicolo"("uuid_modello_veicolo");



ALTER TABLE ONLY "public"."dati_veicolo_ritirato"
    ADD CONSTRAINT "dati_veicolo_ritirato_uuid_camion_ritiro_fkey" FOREIGN KEY ("uuid_camion_ritiro") REFERENCES "public"."camion_trasporto_veicoli"("uuid_camion_trasporto_veicoli");



ALTER TABLE ONLY "public"."demolizione_parziale"
    ADD CONSTRAINT "dp_cd_fk" FOREIGN KEY ("uuid_certificato_demolizione") REFERENCES "public"."certificato_demolizione"("uuid_certificato_demolizione") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."demolizione_totale"
    ADD CONSTRAINT "dt_cd_fk" FOREIGN KEY ("uuid_certificato_demolizione") REFERENCES "public"."certificato_demolizione"("uuid_certificato_demolizione") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."dati_veicolo_ritirato"
    ADD CONSTRAINT "dvr_arv_fk" FOREIGN KEY ("uuid_azienda_ritiro_veicoli") REFERENCES "public"."azienda_ritiro_veicoli"("uuid_azienda_ritiro_veicoli") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."dati_veicolo_ritirato"
    ADD CONSTRAINT "dvr_md_fk" FOREIGN KEY ("uuid_modello_veicolo") REFERENCES "public"."modello_veicolo"("uuid_modello_veicolo") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."log_avanzamento_demolizione"
    ADD CONSTRAINT "log_avanzamento_demolizione_uuid_stato_avanzamento_fkey" FOREIGN KEY ("uuid_stato_avanzamento") REFERENCES "public"."stati_avanzamento"("uuid_stato_avanzamento");



ALTER TABLE ONLY "public"."log_trasporto_veicolo"
    ADD CONSTRAINT "log_trasporto_veicolo_uuid_autista_ctv_fkey" FOREIGN KEY ("uuid_autista_ctv") REFERENCES "public"."autista_camion_trasporto_veicoli"("uuid_autista_ctv");



ALTER TABLE ONLY "public"."log_trasporto_veicolo"
    ADD CONSTRAINT "log_trasporto_veicolo_uuid_camion_tv_fkey" FOREIGN KEY ("uuid_camion_tv") REFERENCES "public"."camion_trasporto_veicoli"("uuid_camion_trasporto_veicoli");



ALTER TABLE ONLY "public"."log_trasporto_veicolo"
    ADD CONSTRAINT "log_trasporto_veicolo_uuid_veicolo_ritirato_fkey" FOREIGN KEY ("uuid_veicolo_ritirato") REFERENCES "public"."dati_veicolo_ritirato"("uuid_veicolo_ritirato");



ALTER TABLE ONLY "public"."log_avanzamento_demolizione"
    ADD CONSTRAINT "sad_dvr_fk" FOREIGN KEY ("uuid_veicolo_ritirato") REFERENCES "public"."dati_veicolo_ritirato"("uuid_veicolo_ritirato") ON UPDATE CASCADE ON DELETE RESTRICT;



CREATE POLICY "allow delete to all" ON "public"."dati_veicolo_ritirato" FOR DELETE USING (true);



GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";



GRANT ALL ON TABLE "public"."autista_camion_trasporto_veicoli" TO "anon";
GRANT ALL ON TABLE "public"."autista_camion_trasporto_veicoli" TO "authenticated";
GRANT ALL ON TABLE "public"."autista_camion_trasporto_veicoli" TO "service_role";



GRANT ALL ON TABLE "public"."azienda_ritiro_veicoli" TO "anon";
GRANT ALL ON TABLE "public"."azienda_ritiro_veicoli" TO "authenticated";
GRANT ALL ON TABLE "public"."azienda_ritiro_veicoli" TO "service_role";



GRANT ALL ON TABLE "public"."camion_trasporto_veicoli" TO "anon";
GRANT ALL ON TABLE "public"."camion_trasporto_veicoli" TO "authenticated";
GRANT ALL ON TABLE "public"."camion_trasporto_veicoli" TO "service_role";



GRANT ALL ON TABLE "public"."certificato_demolizione" TO "anon";
GRANT ALL ON TABLE "public"."certificato_demolizione" TO "authenticated";
GRANT ALL ON TABLE "public"."certificato_demolizione" TO "service_role";



GRANT ALL ON TABLE "public"."dati_veicolo_eliminato" TO "anon";
GRANT ALL ON TABLE "public"."dati_veicolo_eliminato" TO "authenticated";
GRANT ALL ON TABLE "public"."dati_veicolo_eliminato" TO "service_role";



GRANT ALL ON TABLE "public"."dati_veicolo_ritirato" TO "anon";
GRANT ALL ON TABLE "public"."dati_veicolo_ritirato" TO "authenticated";
GRANT ALL ON TABLE "public"."dati_veicolo_ritirato" TO "service_role";



GRANT ALL ON TABLE "public"."demolizione_parziale" TO "anon";
GRANT ALL ON TABLE "public"."demolizione_parziale" TO "authenticated";
GRANT ALL ON TABLE "public"."demolizione_parziale" TO "service_role";



GRANT ALL ON TABLE "public"."demolizione_totale" TO "anon";
GRANT ALL ON TABLE "public"."demolizione_totale" TO "authenticated";
GRANT ALL ON TABLE "public"."demolizione_totale" TO "service_role";



GRANT ALL ON TABLE "public"."log_avanzamento_demolizione" TO "anon";
GRANT ALL ON TABLE "public"."log_avanzamento_demolizione" TO "authenticated";
GRANT ALL ON TABLE "public"."log_avanzamento_demolizione" TO "service_role";



GRANT ALL ON TABLE "public"."log_trasporto_veicolo" TO "anon";
GRANT ALL ON TABLE "public"."log_trasporto_veicolo" TO "authenticated";
GRANT ALL ON TABLE "public"."log_trasporto_veicolo" TO "service_role";



GRANT ALL ON TABLE "public"."modello_veicolo" TO "anon";
GRANT ALL ON TABLE "public"."modello_veicolo" TO "authenticated";
GRANT ALL ON TABLE "public"."modello_veicolo" TO "service_role";



GRANT ALL ON TABLE "public"."rules_user" TO "anon";
GRANT ALL ON TABLE "public"."rules_user" TO "authenticated";
GRANT ALL ON TABLE "public"."rules_user" TO "service_role";



GRANT ALL ON TABLE "public"."stati_avanzamento" TO "anon";
GRANT ALL ON TABLE "public"."stati_avanzamento" TO "authenticated";
GRANT ALL ON TABLE "public"."stati_avanzamento" TO "service_role";



GRANT ALL ON TABLE "public"."stato_avanzamento_ritiro" TO "anon";
GRANT ALL ON TABLE "public"."stato_avanzamento_ritiro" TO "authenticated";
GRANT ALL ON TABLE "public"."stato_avanzamento_ritiro" TO "service_role";



GRANT ALL ON TABLE "public"."v_pratiche_aperte_per_azienda" TO "anon";
GRANT ALL ON TABLE "public"."v_pratiche_aperte_per_azienda" TO "authenticated";
GRANT ALL ON TABLE "public"."v_pratiche_aperte_per_azienda" TO "service_role";



GRANT ALL ON TABLE "public"."vw_marche_uniche" TO "anon";
GRANT ALL ON TABLE "public"."vw_marche_uniche" TO "authenticated";
GRANT ALL ON TABLE "public"."vw_marche_uniche" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";







