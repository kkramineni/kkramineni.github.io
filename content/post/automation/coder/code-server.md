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
