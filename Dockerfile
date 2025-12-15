FROM nginx:alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy your site
COPY . /usr/share/nginx/html

# Expose nginx port
EXPOSE 80

