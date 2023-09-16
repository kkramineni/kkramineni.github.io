---
title: "How to Build vSphere Home Lab, a step by step Guide"
date: 2023-09-08
draft: false
language: en

summary: The idea is to install VMware Workstation on an existing Laptop/Desktop, install ESXi on two Workstation VMs and deploy vCenter as a  virtual machine. Then we can create additional nested VMs on an ESXi host and test vSphere features.
description:
author: Kishore Kumar Ramineni

categories: VMware
tags:
    - VMware
    - Home Lab
---
## Introduction
### Installing VMware workstation
<image src="/images/vmware_workstation.png" height="auto" width="auto" position="center">

Install VMware player or Workstaion pro 17 Trial. please follow the link for VMware Workstation installation requirements here: https://www.vmware.com/products/workstation-pro/faqs.html#installation.

Once VMware Workstation is installed, you can enjoy a fully functional virtualization platform for 30 days for free.

### Home Lab Explanation
<image src="/images/Lab_BG.png" height="auto" width="auto" position="center">

As shown in the diagram, I have used the NAT network, which allows me to reach internet via my Laptop connected Wi-Fi Network

Also I have created a LAN segment in VMware workstation. This allows me to control and test any of the stuff like Firewall and DHCP, DNS etc.

###
> Can I install and configure without all these network related customisation ?
Yes, we can simply go ahead with default settings of VMware Workstation installation