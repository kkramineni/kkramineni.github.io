+++
title = "How to Setup Packer"
description = "Installing Packer on Rocky Linux from the HashiCorp RPM repository, including the cracklib conflict that breaks the default package."
date = "2023-10-20"
author = "Kishore"
tags = ["IaC", "Automation", "Linux", "packer", "Home Lab"]
categories = "Automation"
thumbnail = "/images/packer.png"
series = "packer"
+++

## What is Packer?

Packer builds identical machine images for multiple platforms from a single source template. That makes it a good fit for golden images in an image pipeline — build once, deploy the same artifact everywhere.

This post covers installing Packer on Rocky Linux and verifying the setup.

## Install Packer

{{% notice warning "The cracklib conflict" %}}

On RHEL-based distributions, Packer's RPM collides with the `packer` library shipped by `cracklib`, which is already installed. The transaction fails with a file conflict.

The workaround is to unlink the conflicting binary, then reboot:

```
unlink /usr/sbin/packer
```

{{% /notice %}}

Log in to the code server as `root` and install the repository tools:

```shell
yum install -y yum-utils
```

![Installing yum-utils](/images/packer/packer-001.png)

Add the HashiCorp repository:

```shell
yum-config-manager --add-repo https://rpm.releases.hashicorp.com/RHEL/hashicorp.repo
```

![Adding the HashiCorp repository](/images/packer/packer-002.png)

Install Packer:

```shell
sudo yum -y install packer
```

![Installing Packer](/images/packer/packer-003.png)

Verify the installation:

```shell
packer version
```

![Verifying the Packer version](/images/packer/packer-004.png)
