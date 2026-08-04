https://roadmap.sh/projects/basic-dns
# Basic DNS Setup Project

This project demonstrates the setup and configuration of custom domain DNS records, routing traffic to multiple hosting providers (**GitHub Pages** and a cloud server like **DigitalOcean / AWS EC2**).

---

## Architecture & Configuration Overview

| Subdomain / Domain | Record Type | Target / Value | Destination |
| :--- | :--- | :--- | :--- |
| `sravanreddy25.in` | `A` | `185.199.108.153`<br>`185.199.109.153`<br>`185.199.110.153`<br>`185.199.111.153` | GitHub Pages Apex Servers |
| `www.sravanreddy25.in` | `CNAME` | `sravanreddy8413.github.io` | GitHub Pages Static Site |
| `app.sravanreddy25.in` | `A` | `<DROPLET_OR_EC2_PUBLIC_IP>` | DigitalOcean / AWS Web Server |
| `_github-pages-challenge-*` | `TXT` | `<VERIFICATION_TOKEN>` | GitHub Domain Ownership Verification |

---

## Tasks Completed

### Task 1: Custom Domain for GitHub Pages
1. **Domain Ownership Verification:** Added a custom `TXT` record (`_github-pages-challenge-Sravanreddy8413`) in GoDaddy DNS to verify domain ownership with GitHub.
2. **Apex Domain Setup:** Configured four `A` records pointing `@` (root domain) to GitHub Pages IP addresses.
3. **Subdomain Mapping:** Created a `CNAME` record for `www` mapping to `sravanreddy8413.github.io`.
4. **Enforced HTTPS:** Configured custom domain settings in GitHub Pages and activated SSL/TLS encryption.

### Task 2: Custom Domain for Web Server (DigitalOcean / EC2)
1. **Subdomain Routing:** Configured an `A` record for `app.sravanreddy25.in` pointing directly to the server's public IPv4 address.
2. **Web Server Host Configuration:** Configured Nginx virtual host (`server_name app.sravanreddy25.in`) to route incoming HTTP requests to the web root directory.
3. **TLS Certificate:** Provisioned Let's Encrypt SSL/TLS certificates via Certbot for HTTPS traffic.

---

## Verification Commands

Validate the records using standard DNS diagnostic tools:

```bash
# Verify Apex A Records
dig A sravanreddy25.in +short

# Verify GitHub CNAME Record
dig CNAME www.sravanreddy25.in +short

# Verify Subdomain A Record
dig A app.sravanreddy25.in +short

# Verify TXT Record
dig TXT _github-pages-challenge-Sravanreddy8413.sravanreddy25.in +short
```
