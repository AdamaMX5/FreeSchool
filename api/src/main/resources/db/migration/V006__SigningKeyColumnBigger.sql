alter table signingkeys modify column encrypted_signing_key varchar(512);
alter table signingkeys modify column verifying_key varchar(512);
