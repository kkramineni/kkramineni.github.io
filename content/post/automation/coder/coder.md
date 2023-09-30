+++
author = "Kishore"
title = "How to Install and Configure Code-Server"
date = "2023-09-25"
description = ""
tags = [
    "IaC",
    "Automation",
    "Code",
]
categories = "Automation"
thumbnail = "images/code-server/code-server.png"
+++

Run VS Code on any machine anywhere and access it in the browser.


### Why I Use Coder?
* Code on any device with a consistent development environment
* Accessible from Browser
* Microsoft VS Code extensions will work



### System Requirements

At the minimum, the recommendation is :

* 1 GB of RAM
* 2 CPU cores

### Installation

To install, run:
```
curl -fsSL https://code-server.dev/install.sh | sh
sudo systemctl enable --now code-server@$USER
```

Post installation check the service status

```
sudo systemctl status code-server@$USER
```
Modify the config parameters to use *https*
```
vi ~/.config/code-server/config.yaml
```

{{% notice tip "modify the vaules to" %}}
* Change the bind address to **0.0.0.0:8080**
* Change the password
* cert to **true** from *false*
{{% /notice %}}

Post change the config file looks like this:
```
bind-addr: 0.0.0.0:8080
auth: password
password: SuperStrongPassword
cert: true
```
### Using the AD Certificate Services generated certificate with Code-Server

I have created a wild card SSL certificate in ADCS, to use for other requirements, where SSL Encryption is required.

### Watch the video on How to Install Code-Server, Generate Wild Card SSL certificate and Use it with Code-Server

{{< youtube u7AK-Fk4JRE >}}

<br>


