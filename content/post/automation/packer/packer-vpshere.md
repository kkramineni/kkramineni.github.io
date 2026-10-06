+++
title = "How to Create Images/Templates/VMs in vSphere - using Packer"
description = "A reference of the Linux, Windows, and ESXi builds covered in this Packer series, and the HCL file structure they share."
date = "2023-11-24"
author = "Kishore"
tags = ["IaC", "Automation", "Linux", "packer", "Home Lab"]
categories = "Automation"
thumbnail = "/images/packer_vsphere.png"
series = "packer"
+++

This series collects examples of using Packer and the Packer plugin for VMware vSphere to automate the creation of virtual machine images. The examples use the HashiCorp Configuration Language (HCL).

All the templates in this series share the same file structure, and each build differs only in the OS-specific template and kickstart/unattend files.

## Linux distributions

| Operating System         | Version   |
| :----------------------- | :-------- |
| VMware Photon OS         | 5         |
| Ubuntu Server            | 22.04 LTS |
| Red Hat Enterprise Linux | 9         |
| Red Hat Enterprise Linux | 8         |
| Red Hat Enterprise Linux | 7         |
| AlmaLinux OS             | 9         |
| AlmaLinux OS             | 8         |
| Rocky Linux              | 9         |
| Rocky Linux              | 8         |
| Oracle Linux             | 9         |
| Oracle Linux             | 8         |
| CentOS Stream            | 9         |
| CentOS Stream            | 8         |
| CentOS Linux             | 7         |

## Microsoft Windows

| Operating System         | Version | Editions                    | Experience       |
| :----------------------- | :------ | :-------------------------- | :--------------- |
| Microsoft Windows Server | 2022    | Standard and Datacenter     | Core and Desktop |
| Microsoft Windows Server | 2019    | Standard and Datacenter     | Core and Desktop |
| Microsoft Windows        | 11 22H2 | Professional and Enterprise | —                |
| Microsoft Windows        | 10 22H2 | Professional and Enterprise | —                |

## VMware ESXi

| Operating System | Version |
| :--------------- | :------ |
| VMware ESXi      | 7       |
| VMware ESXi      | 8       |
