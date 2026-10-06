+++
title = "How to Setup OpenTofu"
description = "Installing OpenTofu from the GitHub release RPM and walking through the write, plan, and apply workflow."
date = "2023-11-06"
author = "Kishore"
tags = ["IaC", "Automation", "Linux", "tofu", "Home Lab"]
categories = "Automation"
thumbnail = "/images/openTofu.png"
series = "OpenTofu"
+++

## What is OpenTofu?

An open-source infrastructure-as-code tool. Previously called OpenTF, OpenTofu is a community-driven fork of Terraform now managed by the Linux Foundation.

## The core workflow

Three stages, in order:

### Write

Define your resources. These can span multiple cloud providers and services — for example, deploying an application onto virtual machines in a VPC network, with security groups and a load balancer attached.

### Plan

OpenTofu produces an execution plan describing what it will create, update, or destroy, based on your configuration compared against the existing infrastructure.

### Apply

Once you approve the plan, OpenTofu performs the proposed operations in dependency order.

## Installing OpenTofu

The most direct method is to download the archive for your platform from [OpenTofu GitHub releases](https://github.com/opentofu/opentofu/releases/).

On RPM-based distributions, log in to the code server as `root` and run:

```shell
yum install https://github.com/opentofu/opentofu/releases/download/v1.6.0-alpha3/tofu_1.6.0-alpha3_amd64.rpm
```

![Installing the OpenTofu RPM](/images/tofu/install_1.png)

![OpenTofu installed](/images/tofu/install_2.png)

Verify the installation:

```shell
tofu version
```

![Checking the OpenTofu version](/images/tofu/tofu_version.png)

Run `tofu` with no arguments for the help output:

```shell
tofu
```

![OpenTofu help output](/images/tofu/install_3.png)
