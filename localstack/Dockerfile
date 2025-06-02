FROM localstack/localstack:latest

# Copy the S3 init script
COPY init-s3.sh /etc/localstack/init/ready.d/init-s3.sh

# Make sure it's executable
RUN chmod +x /etc/localstack/init/ready.d/init-s3.sh
