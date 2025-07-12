---
title: My Final Project - Penetration Testing with OWASP - Cristian Arando
slug: en/my-final-project
image:
  src: /covers/my-final-project.webp
  alt: Cybersecurity penetration testing concept
author: Cristian Arando
language: en
tags: [cybersecurity, penetration testing]
publishDate: "2024-09-20"
authorContact: crisarandosyse@gmail.com
readTime: 5 min
excerpt: My final project to obtain my Systems Engineering degree, a penetration testing applying OWASP in a fullstack academic system.
featured: true
---

## Introduction

As my final project to obtain my Systems Engineering degree, I conducted a comprehensive penetration testing assessment of the SISGAA web system at Universidad Mayor de San Simon. The project applied industry-standard methodologies from OWASP Top 10 and OWASP API Security Top 10 to identify, analyze, and recommend mitigations for security vulnerabilities.

> **Note:** You can view the complete document of this project in the <a href="http://atlas.umss.edu.bo/handle/123456789/47539" target="_blank" rel="noopener noreferrer">UMSS institutional repository</a>.

## Project Background

The SISGAA (Sistema de Gestión Académica y Administrativa) system is a critical web application used by the Department of Computer Science and Systems. It manages sensitive academic and administrative data, making its security essential for protecting both institutional and personal information.

## Methodology

My approach followed a structured penetration testing methodology:

1. **Planning and Scope Definition**: Established clear boundaries and objectives for the security assessment
2. **Information Gathering**: Collected data about the system architecture and technology stack
3. **Vulnerability Analysis**: Identified potential security weaknesses
4. **Exploitation**: Verified vulnerabilities through controlled testing
5. **Documentation**: Detailed findings and recommendations

## Technical Approach

The penetration testing process incorporated two complementary frameworks:

### Web Application Testing (OWASP Top 10)

I conducted thorough tests for common web vulnerabilities, including:

- Cross-Site Scripting (XSS)
- Broken Authentication
- Sensitive Data Exposure
- Security Misconfigurations

### API Security Testing (OWASP API Security Top 10)

With modern web applications heavily relying on APIs, I implemented a specialized methodology:

1. **Discovery**: Mapping the API structure and endpoints
2. **Endpoint Analysis**: Examining request/response patterns
3. **Authentication Testing**: Verifying login mechanisms
4. **Authorization Exploitation**: Testing access control boundaries

## Key Findings

My assessment revealed several security vulnerabilities in the SISGAA system:

1. **Cross Site Scripting (Reflected)**: Allowed potential injection of malicious scripts
2. **Broken Object Level Authorization**: Permitted unauthorized access to resources
3. **Broken Function Level Authorization**: Enabled unauthorized functionality access
4. **API Documentation Leakage**: Exposed sensitive endpoint information via Swagger
5. **Missing Security Headers**: Lacked critical browser security configurations
6. **Vulnerable JavaScript Libraries**: Used outdated components with known vulnerabilities

## Technical Implementation

The project utilized specialized security tools:

- **OWASP ZAP**: For automated vulnerability scanning
- **Burp Suite**: For intercepting and analyzing HTTP requests
- **Custom Scripts**: For testing API authorization flaws
- **Browser Developer Tools**: For analyzing web application behavior

## Impact and Mitigation

For each vulnerability, I provided detailed mitigation strategies:

- **Input Validation and Output Encoding**: To prevent XSS attacks
- **Proper Authorization Checks**: To enforce access control
- **API Security Controls**: To protect sensitive endpoints
- **Security Header Implementation**: To enhance browser security
- **Component Updates**: To eliminate known vulnerabilities

## Conclusion

This project demonstrated how systematic penetration testing can identify critical security vulnerabilities in web applications before they can be exploited by malicious actors. The findings highlighted the importance of incorporating security throughout the development lifecycle, particularly for systems handling sensitive information.

The recommendations provided will help strengthen the SISGAA system's security posture, protecting both the institution and its users from potential cyber threats.

## Technical Skills Demonstrated

- Web application security assessment
- API security testing
- Vulnerability exploitation techniques
- Security documentation and reporting
- Practical application of OWASP methodologies
