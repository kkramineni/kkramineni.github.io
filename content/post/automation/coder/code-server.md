+++
title = "How to Install and Configure Code-Server"
description = "Running VS Code in a browser, with a self-signed or ADCS wildcard certificate for HTTPS."
date = "2023-09-25"
author = "Kishore"
tags = ["IaC", "Automation", "Code"]
categories = "Automation"
thumbnail = "/images/code-server/code-server.png"
+++

VS Code on any machine, reachable from a browser. This post covers installing code-server, enabling HTTPS, and pointing it at a wildcard certificate generated in Active Directory Certificate Services.

## Why I use it

- A consistent development environment from any device
- No local install — everything runs on the server
- Microsoft VS Code extensions work as they do locally

## System requirements

At minimum:

- 1 GB RAM
- 2 CPU cores

## Installation

```shell
curl -fsSL https://code-server.dev/install.sh | sh
sudo systemctl enable --now code-server@$USER
```

Check the service status afterwards:

```shell
sudo systemctl status code-server@$USER
```

To serve over HTTPS, edit the config file:

```shell
vi ~/.config/code-server/config.yaml
```

{{% notice tip "Config values to change" %}}

- Set `bind-addr` to **0.0.0.0:8080**
- Set the `password`
- Set `cert` to **true**

{{% /notice %}}

After those changes the file looks like this:

```yaml
bind-addr: 0.0.0.0:8080
auth: password
password: SuperStrongPassword
cert: true
```

## Using an ADCS-generated certificate

I created a wildcard SSL certificate in ADCS for other requirements where SSL encryption is needed, and reused it here.

## Watch the video

How to install code-server, generate a wildcard SSL certificate, and use it with code-server:

{{< youtube u7AK-Fk4JRE >}}

## Running it safely

code-server is powerful and dangerous if exposed carelessly: it is a full shell and file system behind a password.

- **Bind address.** `bind-addr: 0.0.0.0:8080` exposes it to the network. That is fine inside a lab; on anything reachable from the internet, put it behind a reverse proxy (nginx or Caddy) with TLS and real authentication instead.
- **Certificate.** `cert: true` generates a self-signed certificate, which browsers will warn about. For a lab that is acceptable; for anything shared, use a real certificate (the ADCS wildcard in this post, or Let's Encrypt via the reverse proxy).
- **Password.** The config stores it in plain text. Treat the file as a secret and do not commit it.
- **Updates.** code-server moves fast. Re-run the install script periodically, or pin a version and upgrade deliberately.

## Related

- [Ansible + AWX](/post/automation/ansible/ansible1/)
- [Packer](/post/automation/packer/packer1/)
