https://roadmap.sh/projects/basic-dns


# Basic DNS Setup

## 📌 Project Overview

This beginner-level DevOps project demonstrates how to purchase and configure a **custom domain name** and create basic **DNS records**.

The project covers two common DevOps scenarios:

1. Pointing a custom domain to a **GitHub Pages** website.
2. Pointing a custom domain to a **DigitalOcean Droplet** running a static website with Nginx.

The project provides practical experience with:

* Domain names
* DNS
* DNS records
* A records
* CNAME records
* Nameservers
* GitHub Pages custom domains
* DigitalOcean Droplets
* Nginx
* DNS troubleshooting
* `dig`
* `nslookup`
* `ping`
* `curl`

---

# 🎯 Project Goal

Purchase or use an existing domain and configure DNS so that the domain can access websites hosted on:

```text
GitHub Pages
```

and:

```text
DigitalOcean Droplet
```

The final architecture will look like:

```text
                         Internet
                            |
                     Custom Domain
                    example.com
                            |
                       DNS Records
                       /          \
                      /            \
                     v              v
              GitHub Pages    DigitalOcean
                                Droplet
                                   |
                                  Nginx
                                   |
                              Static Website
```

---

# 🌐 What is DNS?

DNS stands for:

> **Domain Name System**

DNS converts human-readable domain names into IP addresses or other DNS targets.

For example:

```text
example.com
     |
     v
DNS
     |
     v
203.0.113.10
```

Instead of remembering:

```text
203.0.113.10
```

users can access:

```text
example.com
```

---

# 🛠️ Technologies Used

| Technology   | Purpose                |
| ------------ | ---------------------- |
| DNS          | Domain name resolution |
| GitHub Pages | Static website hosting |
| DigitalOcean | Cloud server           |
| Nginx        | Web server             |
| A Record     | Domain → IPv4 address  |
| CNAME        | Name → hostname        |
| TXT Record   | Domain verification    |
| `dig`        | DNS troubleshooting    |
| `nslookup`   | DNS lookup             |
| `curl`       | HTTP testing           |

---

# 📋 Prerequisites

You need:

* A registered domain
* DNS management access
* GitHub account
* GitHub Pages website
* DigitalOcean account
* DigitalOcean Droplet
* Basic Linux knowledge
* SSH access to the Droplet

You can purchase a domain from providers such as:

* Cloudflare Registrar
* Namecheap
* GoDaddy
* Other domain registrars

---

# 🏗️ Project Architecture

## GitHub Pages

```text
Browser
   |
   | https://www.example.com
   |
   v
DNS
   |
   v
GitHub Pages
   |
   v
Static Website
```

## DigitalOcean

```text
Browser
   |
   | https://example.com
   |
   v
DNS
   |
   v
DigitalOcean Public IP
   |
   v
Nginx
   |
   v
Static Website
```

---

# 1️⃣ Purchase or Use an Existing Domain

You can use an existing domain.

For example:

```text
example.com
```

If purchasing a new domain, choose a registrar and complete the registration.

After registration, locate:

```text
DNS Management
```

or:

```text
DNS Records
```

The exact interface differs between providers.

---

# 2️⃣ Identify Your DNS Provider

Check where DNS is managed.

Common DNS providers include:

```text
Cloudflare
GoDaddy
Namecheap
DigitalOcean
AWS Route 53
```

Look for:

```text
Nameservers
DNS Records
Zone
DNS Management
```

---

# 3️⃣ Understand Common DNS Records

## A Record

An A record maps a hostname to an IPv4 address.

Example:

```text
example.com
     |
     v
203.0.113.10
```

Example record:

```text
Type: A
Name: @
Value: 203.0.113.10
TTL: Auto
```

---

## CNAME Record

A CNAME maps one hostname to another hostname.

Example:

```text
www.example.com
       |
       v
example.github.io
```

Example:

```text
Type: CNAME
Name: www
Target: username.github.io
```

---

## TXT Record

TXT records are commonly used for:

* Domain verification
* Email authentication
* SPF
* DKIM
* Other verification purposes

Example:

```text
Type: TXT
Name: @
Value: verification-value
```

---

## AAAA Record

An AAAA record maps a hostname to an IPv6 address.

Example:

```text
Type: AAAA
Name: @
Value: 2001:db8::10
```

---

# 4️⃣ Task #1 — Custom Domain for GitHub Pages

Before starting this task, make sure you have a working GitHub Pages website.

Example:

```text
https://username.github.io/gh-deployment-workflow/
```

---

# 5️⃣ Find Your GitHub Pages Repository

Open your GitHub repository.

For example:

```text
username/gh-deployment-workflow
```

Verify that GitHub Pages is already working.

Go to:

```text
Repository
   ↓
Settings
   ↓
Pages
```

Confirm that the Pages deployment is active.

---

# 6️⃣ Choose Your Custom Domain

For this project, assume:

```text
example.com
```

You can also use:

```text
www.example.com
```

A common setup is:

```text
example.com
www.example.com
```

---

# 7️⃣ Configure DNS for GitHub Pages

For an apex/root domain such as:

```text
example.com
```

GitHub Pages commonly uses A records pointing to GitHub Pages' published IP addresses.

A typical configuration is:

```text
Type    Name    Value
A       @       GitHub Pages IP
A       @       GitHub Pages IP
A       @       GitHub Pages IP
A       @       GitHub Pages IP
```

For the `www` hostname:

```text
Type     Name    Target
CNAME    www     username.github.io
```

> Use the current GitHub Pages documentation to verify the exact IP addresses and recommended configuration before creating records.

---

# 8️⃣ Configure Custom Domain in GitHub

Open:

```text
GitHub Repository
        |
        v
Settings
        |
        v
Pages
        |
        v
Custom domain
```

Enter:

```text
example.com
```

Click:

```text
Save
```

GitHub may create or update the repository's custom-domain configuration.

---

# 9️⃣ Verify GitHub Pages DNS

From your local machine:

```bash
dig example.com
```

Check the result.

For `www`:

```bash
dig www.example.com
```

You can also use:

```bash
nslookup example.com
```

Example:

```text
Name: example.com
Address: <GitHub Pages IP>
```

---

# 🔟 Verify HTTP Access

Use:

```bash
curl -I https://example.com
```

You should receive an HTTP response.

Example:

```text
HTTP/2 200
```

Open the domain in your browser:

```text
https://example.com
```

---

# 🔒 1️⃣1️⃣ Enable HTTPS for GitHub Pages

Once DNS has propagated and GitHub has verified the domain, check:

```text
Repository
   ↓
Settings
   ↓
Pages
   ↓
Enforce HTTPS
```

Enable HTTPS when available.

Then test:

```text
https://example.com
```

---

# 1️⃣2️⃣ GitHub Pages DNS Architecture

```text
                    User
                     |
                     |
              example.com
                     |
                     v
                    DNS
                     |
            +--------+--------+
            |                 |
            v                 v
       A Records           CNAME
            |                 |
            v                 v
      GitHub Pages      username.github.io
            |                 |
            +--------+--------+
                     |
                     v
                GitHub Pages
                     |
                     v
                index.html
```

---

# 1️⃣3️⃣ Task #2 — Custom Domain for DigitalOcean

For this task, you need:

* DigitalOcean Droplet
* Public IPv4 address
* Nginx
* Static website
* SSH access

Example:

```text
Droplet IP:

203.0.113.10
```

---

# 1️⃣4️⃣ Verify the DigitalOcean Server

Connect using SSH:

```bash
ssh -i ~/.ssh/server-key ubuntu@SERVER_IP
```

Example:

```bash
ssh -i ~/.ssh/server-key ubuntu@203.0.113.10
```

Check Nginx:

```bash
sudo systemctl status nginx
```

Expected:

```text
Active: active (running)
```

---

# 1️⃣5️⃣ Test the Server IP

From your local computer:

```bash
curl -I http://SERVER_IP
```

Example:

```bash
curl -I http://203.0.113.10
```

Expected:

```text
HTTP/1.1 200 OK
```

Open:

```text
http://SERVER_IP
```

Your static website should appear.

---

# 1️⃣6️⃣ Create DNS A Record for DigitalOcean

Suppose your Droplet IP is:

```text
203.0.113.10
```

Create:

```text
Type: A
Name: @
Value: 203.0.113.10
TTL: Auto
```

This means:

```text
example.com
      |
      v
203.0.113.10
```

---

# 1️⃣7️⃣ Configure `www`

Create:

```text
Type: CNAME
Name: www
Target: example.com
TTL: Auto
```

Now:

```text
www.example.com
       |
       v
example.com
       |
       v
203.0.113.10
```

---

# 1️⃣8️⃣ Verify DNS

Run:

```bash
dig example.com
```

Look for:

```text
ANSWER SECTION
```

You should see the configured IP address.

Run:

```bash
dig +short example.com
```

Example:

```text
203.0.113.10
```

Check `www`:

```bash
dig +short www.example.com
```

---

# 1️⃣9️⃣ Use `nslookup`

Run:

```bash
nslookup example.com
```

Example:

```text
Name: example.com
Address: 203.0.113.10
```

For `www`:

```bash
nslookup www.example.com
```

---

# 2️⃣0️⃣ Configure Nginx for the Domain

SSH into the DigitalOcean server:

```bash
ssh ubuntu@SERVER_IP
```

Create an Nginx configuration:

```bash
sudo nano /etc/nginx/sites-available/static-site
```

Example:

```nginx
server {
    listen 80;
    listen [::]:80;

    server_name example.com www.example.com;

    root /var/www/static-site;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

Replace:

```text
example.com
```

with your actual domain.

---

# 2️⃣1️⃣ Enable the Nginx Configuration

Create the symbolic link:

```bash
sudo ln -s /etc/nginx/sites-available/static-site \
/etc/nginx/sites-enabled/static-site
```

If the default site conflicts:

```bash
sudo rm -f /etc/nginx/sites-enabled/default
```

Test:

```bash
sudo nginx -t
```

Expected:

```text
syntax is ok
test is successful
```

Reload:

```bash
sudo systemctl reload nginx
```

---

# 2️⃣2️⃣ Test the Domain

Open:

```text
http://example.com
```

or:

```text
http://www.example.com
```

The static website should load from the DigitalOcean Droplet.

---

# 2️⃣3️⃣ Test Using curl

Run:

```bash
curl -I http://example.com
```

Expected:

```text
HTTP/1.1 200 OK
```

Check the content:

```bash
curl http://example.com
```

You should receive the HTML response.

---

# 🔒 2️⃣4️⃣ Configure HTTPS

For a production-style website, configure HTTPS.

Install Certbot:

```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx -y
```

Request a certificate:

```bash
sudo certbot --nginx -d example.com -d www.example.com
```

Follow the prompts.

After successful configuration:

```text
https://example.com
```

Test:

```bash
curl -I https://example.com
```

---

# 2️⃣5️⃣ Configure Firewall

On Ubuntu:

```bash
sudo ufw status
```

Allow SSH:

```bash
sudo ufw allow 22/tcp
```

Allow HTTP:

```bash
sudo ufw allow 80/tcp
```

Allow HTTPS:

```bash
sudo ufw allow 443/tcp
```

Enable firewall:

```bash
sudo ufw enable
```

Check:

```bash
sudo ufw status
```

Expected services:

```text
22/tcp
80/tcp
443/tcp
```

---

# 🔍 2️⃣6️⃣ DNS Troubleshooting

DNS changes are not always visible immediately because DNS records can be cached.

Check:

```bash
dig example.com
```

Use:

```bash
dig +short example.com
```

Check nameservers:

```bash
dig NS example.com
```

Check CNAME:

```bash
dig CNAME www.example.com
```

Check DNS using a specific resolver:

```bash
dig @1.1.1.1 example.com
```

Another public resolver:

```bash
dig @8.8.8.8 example.com
```

---

# 🧪 2️⃣7️⃣ End-to-End Testing

## GitHub Pages

Test:

```bash
dig example.com
```

Then:

```bash
curl -I https://example.com
```

Browser:

```text
https://example.com
```

---

## DigitalOcean

Test:

```bash
dig example.com
```

Then:

```bash
curl -I http://example.com
```

Browser:

```text
http://example.com
```

After HTTPS:

```bash
curl -I https://example.com
```

---

# 📊 DNS Record Examples

## GitHub Pages

| Type  | Name  | Target               |
| ----- | ----- | -------------------- |
| A     | `@`   | GitHub Pages IP      |
| A     | `@`   | GitHub Pages IP      |
| A     | `@`   | GitHub Pages IP      |
| A     | `@`   | GitHub Pages IP      |
| CNAME | `www` | `username.github.io` |

---

## DigitalOcean

| Type  | Name  | Target              |
| ----- | ----- | ------------------- |
| A     | `@`   | Droplet Public IPv4 |
| CNAME | `www` | `example.com`       |

> Exact DNS records depend on your provider and hostname design. Verify provider-specific requirements before applying them.

---

# 🏗️ Final Architecture

## GitHub Pages

```text
                         Internet
                            |
                            v
                     example.com
                            |
                            v
                           DNS
                            |
                            v
                      GitHub Pages
                            |
                            v
                       Static Site
```

## DigitalOcean

```text
                         Internet
                            |
                            v
                     example.com
                            |
                            v
                           DNS
                            |
                            v
                  DigitalOcean Droplet
                            |
                            v
                          Nginx
                            |
                            v
                  /var/www/static-site
                            |
                            v
                       index.html
```

---

# 🚨 Common Problems

## Problem 1 — DNS does not resolve

Check:

```bash
dig example.com
```

Possible causes:

* Incorrect DNS record
* Incorrect nameservers
* DNS propagation/cache
* Typographical error
* Domain registration issue

---

## Problem 2 — Domain points to the wrong server

Check:

```bash
dig +short example.com
```

Compare the result with your server IP.

---

## Problem 3 — `www` does not work

Check:

```bash
dig CNAME www.example.com
```

Verify the CNAME target.

---

## Problem 4 — Nginx does not load

Check:

```bash
sudo systemctl status nginx
```

Then:

```bash
sudo nginx -t
```

Check logs:

```bash
sudo tail -f /var/log/nginx/error.log
```

---

## Problem 5 — HTTP works but HTTPS does not

Check:

```bash
sudo ss -tlnp | grep :443
```

Check firewall:

```bash
sudo ufw status
```

Check Certbot:

```bash
sudo certbot certificates
```

---

# 🧠 Important DNS Concepts

## Domain

Example:

```text
example.com
```

## Subdomain

Example:

```text
www.example.com
api.example.com
blog.example.com
```

## Nameserver

Nameservers tell the internet which DNS infrastructure is authoritative for your domain.

## TTL

TTL means:

> Time To Live

It controls how long DNS responses can be cached.

Example:

```text
TTL = 3600
```

means the record can be cached for approximately one hour.

---

# 💼 Real-World DevOps Use Case

DNS is fundamental to production infrastructure.

A typical application architecture may look like:

```text
                    Users
                      |
                      v
                example.com
                      |
                      v
                     DNS
                      |
             +--------+--------+
             |                 |
             v                 v
          CloudFront         ALB
                                |
                                v
                         Kubernetes / EC2
                                |
                    +-----------+-----------+
                    |           |           |
                   API        Frontend     Services
```

DNS can be used for:

```text
example.com
www.example.com
api.example.com
app.example.com
dev.example.com
staging.example.com
```

---

# 🚀 Future Improvements

This beginner project can evolve into advanced DevOps infrastructure.

### Level 1 — DNS

```text
Domain
A Record
CNAME
TXT
AAAA
TTL
Nameservers
```

### Level 2 — Web Server

```text
Nginx
HTTPS
Certbot
Firewall
Security
```

### Level 3 — Cloud

```text
AWS Route 53
CloudFront
ALB
EC2
S3
```

### Level 4 — Infrastructure as Code

```text
Terraform
DNS Zones
DNS Records
AWS Route 53
Cloudflare
```

### Level 5 — Production

```text
Route 53
CloudFront
ALB
EKS
Ingress
External DNS
TLS
Monitoring
```

---

# 📁 Suggested Repository Structure

```text
devopsdns/
│
├── README.md
│
└── screenshots/
    ├── github-pages-dns.png
    ├── digitalocean-dns.png
    ├── dns-records.png
    └── domain-working.png
```

Screenshots are optional but useful for documenting your implementation.

---

# 🔐 Security Considerations

Never commit:

```text
Cloud credentials
API keys
SSH private keys
Passwords
Access tokens
```

DNS configuration should also be protected with:

* MFA on registrar account
* MFA on cloud account
* Strong passwords
* Restricted API tokens
* Least-privilege permissions
* Registrar/domain-lock features where appropriate

---

# 📋 Final Project Checklist

| Requirement                           | Status     |
| ------------------------------------- | ---------- |
| Domain purchased/available            | ⬜          |
| DNS provider identified               | ⬜          |
| GitHub Pages website created          | ⬜          |
| GitHub Pages custom domain configured | ⬜          |
| GitHub Pages DNS records configured   | ⬜          |
| GitHub Pages domain verified          | ⬜          |
| GitHub Pages HTTPS enabled            | ⬜          |
| DigitalOcean Droplet created          | ⬜          |
| Nginx installed                       | ⬜          |
| Static site deployed                  | ⬜          |
| DigitalOcean A record configured      | ⬜          |
| `www` CNAME configured                | ⬜          |
| DNS verified with `dig`               | ⬜          |
| DNS verified with `nslookup`          | ⬜          |
| Domain tested with `curl`             | ⬜          |
| Nginx domain configuration completed  | ⬜          |
| HTTPS configured on Droplet           | ⭐ Optional |
| Screenshots added                     | ⭐ Optional |

---

# ❓ Interview Questions

### 1. What is DNS?

DNS translates domain names into IP addresses or other DNS targets so clients can locate services.

### 2. What is an A record?

An A record maps a hostname to an IPv4 address.

Example:

```text
example.com → 203.0.113.10
```

### 3. What is a CNAME?

A CNAME maps one hostname to another hostname.

Example:

```text
www.example.com → example.com
```

### 4. What is TTL?

TTL specifies how long DNS information can be cached.

### 5. What is a nameserver?

A nameserver provides the authoritative DNS information for a domain or delegates DNS resolution to the appropriate DNS infrastructure.

### 6. How do you troubleshoot DNS?

Common commands:

```bash
dig example.com
```

```bash
nslookup example.com
```

```bash
dig +short example.com
```

```bash
dig NS example.com
```

### 7. How do you verify that DNS points to the correct server?

Run:

```bash
dig +short example.com
```

Compare the returned IP with the intended server's public IP.

### 8. What is the difference between DNS and Nginx?

DNS determines where a hostname resolves.

Nginx is a web server that receives HTTP/HTTPS requests and serves or proxies the requested content.

### 9. What happens when a user enters `https://example.com`?

A simplified flow is:

```text
Browser
   |
DNS Resolution
   |
IP Address
   |
TCP/TLS Connection
   |
Web Server
   |
HTTP Request
   |
Response
```

### 10. How would you manage DNS in production?

DNS can be managed through:

```text
AWS Route 53
Cloudflare
Terraform
Infrastructure as Code
CI/CD
```

This allows DNS changes to be version-controlled and automated.

---

# 🎯 Learning Objectives

After completing this project, you should understand:

* What DNS is
* How domain names work
* A records
* CNAME records
* TXT records
* AAAA records
* Nameservers
* TTL
* GitHub Pages custom domains
* DigitalOcean DNS configuration
* Nginx domain configuration
* DNS troubleshooting
* `dig`
* `nslookup`
* `curl`
* HTTPS basics

---

# 📌 GitHub Repository Description

Use:

```text
Beginner DevOps project demonstrating custom domain configuration, DNS records, GitHub Pages, DigitalOcean, Nginx, and DNS troubleshooting.
```

## Suggested GitHub Topics

```text
dns
devops
linux
github-pages
digitalocean
nginx
cloud
domain
networking
terraform
dns-management
```

---

# 🏁 Conclusion

The **Basic DNS Setup** project provides a practical introduction to domain names and DNS configuration.

The final setup demonstrates two scenarios:

```text
             Custom Domain
                   |
                  DNS
             +-----+-----+
             |           |
             v           v
       GitHub Pages   DigitalOcean
                         |
                        Nginx
                         |
                    Static Site
```

You should now be able to:

* Configure a custom domain
* Create A records
* Create CNAME records
* Point a domain to GitHub Pages
* Point a domain to a DigitalOcean Droplet
* Configure Nginx for a domain
* Verify DNS using `dig`
* Troubleshoot DNS resolution
* Configure HTTPS
* Understand the basic DNS concepts used in DevOps

This project creates the foundation for more advanced topics such as **AWS Route 53, CloudFront, Application Load Balancers, Kubernetes Ingress, ExternalDNS, Terraform-managed DNS, and production CI/CD infrastructure**.

