FROM anroe/nginx-geoip2

# Install required packages and Nginx modules if necessary
# RUN apt-get update && apt-get install -y \
#     nginx-module-geoip2

# Copy your custom Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Copy GeoIP2 data files
COPY GeoLite2-Country.mmdb /etc/nginx/GeoLite2-Country.mmdb
COPY GeoLite2-City.mmdb /etc/nginx/GeoLite2-City.mmdb

# Expose ports
EXPOSE 80
EXPOSE 443

# Set default command
CMD ["nginx", "-g", "daemon off;"]
