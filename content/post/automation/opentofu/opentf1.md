+++
author = "Kishore"
title = "How to setup OpenTofu"
date = "2023-11-06"
description = ""
tags = [
    "IaC",
    "Automation",
    "Linux",
    "tofu",
    "Home Lab",
]
categories = "Automation"
thumbnail = "/images/openTofu.png"
series = "OpenTofu"
+++

![img placeholder](/images/openTofu.png " ")
##### What is OpenTofu?
The open source infrastructure as code tool.
Previously named OpenTF, OpenTofu is a fork of Terraform that is open-source, community-driven, and managed by the Linux Foundation.

---

The core OpenTofu workflow consists of three stages:

###### Write:
Defining resources, which may be across multiple cloud providers and services. For example, you might create a configuration to deploy an application on virtual machines in a Virtual Private Cloud (VPC) network with security groups and a load balancer.

###### Plan:
OpenTofu creates an execution plan describing the infrastructure it will create, update, or destroy based on the existing infrastructure and your configuration.

###### Apply:
On approval, OpenTofu performs the proposed operations in the correct order, respecting any resource dependencies.


---
### Getting started with OpenTofu

##### Installing OpenTofu

The most direct method to install OpenTofu is to download it from GitHub releases.where you can find the zip archive for the platforms.


<a href="https://github.com/opentofu/opentofu/releases/"> OpenTofu Download </a>

In order to install(RPM based distros), Login to the code server as root, run the floowing commands

```shell
yum install https://github.com/opentofu/opentofu/releases/download/v1.6.0-alpha3/tofu_1.6.0-alpha3_amd64.rpm
```

![img placeholder](/images/tofu/install_1.png " ")

![img placeholder](/images/tofu/install_2.png " ")

Validate the tofu installation by running

``` shell
tofu version
```
![img placeholder](/images/tofu/tofu_version.png " ")

``` shell
tofu
```

![img placeholder](/images/tofu/install_3.png  " ")
