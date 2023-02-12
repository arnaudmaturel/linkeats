FROM mcr.microsoft.com/mssql/server:2022-latest

COPY data /data
COPY start.sh /

RUN chmod +x /start.sh

ENV SA_PASSWORD "Password10_"
ENV ACCEPT_EULA "Y"