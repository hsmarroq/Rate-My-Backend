\echo 'Delete and recreate auth_starter db?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE rate_my_setup;
CREATE DATABASE rate_my_setup;
\connect rate_my_setup

\i rate-my-setup-schema.sql

\echo 'Delete and recreate rate_my_setup_test_test db?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE rate_my_setup_test_test;
CREATE DATABASE rate_my_setup_test_test;
\connect rate_my_setup_test_test

\i rate-my-setup-schema.sql
