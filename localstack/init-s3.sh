#!/bin/bash

BUCKET_NAME="il.co.johnbryce.yuvalrayer"
IMAGE_DIR="/tmp/s3-data"  # Correct the path to the mounted folder

echo ">> Creating S3 bucket: $BUCKET_NAME"
awslocal s3 mb s3://$BUCKET_NAME

echo ">> Uploading images to bucket..."
for file in $IMAGE_DIR/*; do
  if [ -f "$file" ]; then  # Check if it's a file (prevents errors for directories)
    echo "   - Uploading $(basename "$file")"
    awslocal s3 cp "$file" "s3://$BUCKET_NAME/"
  else
    echo "   - Skipping non-file: $(basename "$file")"
  fi
done

echo ">> S3 init complete"
