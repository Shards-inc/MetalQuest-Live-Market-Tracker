
# Security Policy

## Supported Versions

Only the latest version of MetalQuest is supported for security updates.

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of our market tracking systems seriously. If you find a vulnerability, please follow these steps:

1. **Do Not Open a Public Issue**: To prevent exploitation, please report vulnerabilities privately.
2. **Contact**: Reach out to the security team at security@shards-inc.example.com.
3. **Information**: Include a detailed summary, steps to reproduce, and potential impact.

## Sanity Check Implementation

The application includes:
- **Runtime Validation**: Checks for `API_KEY` presence before any network call.
- **Modality Enforcement**: Ensures only supported modalities (e.g., Google Search) are active.
- **Input Filtering**: Prevents prompt injection attempts by validating message structures.
