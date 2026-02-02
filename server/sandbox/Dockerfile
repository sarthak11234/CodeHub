# Minimal Node.js sandbox for secure code execution
FROM node:20-alpine

# Create non-root user for security
RUN addgroup -g 1001 sandbox && \
    adduser -D -u 1001 -G sandbox sandbox

# Set working directory
WORKDIR /sandbox

# Copy execution script
COPY run.js .

# Set ownership
RUN chown -R sandbox:sandbox /sandbox

# Switch to non-root user
USER sandbox

# Default command
CMD ["node", "run.js"]
