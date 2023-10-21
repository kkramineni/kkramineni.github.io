+++
author = "Kishore"
title = "How to Install VMware ESXi - Nested Lab"
date = "2023-10-10"
description = ""
tags = [
    "VMware Workstation",
    "Linux",
    "vsphere/esxi",
    "Home Lab",
]
categories = "VMware"
thumbnail = "/images/esxi-host.svg"

+++

This post is part of VMware vShere How to hands-on training that focuses on installing, configuring, and managing VMware vSphere 8, which includes VMware ESXi8 and VMware vCenter8. This course prepares you to administer a vSphere infrastructure for an organization of any size.



### Step1: Create VM
In VMware workstation,

1. Go to File -> Select New Virtual Mahine to create a VM
![img placeholder](/images/vsphere/esxi/001.png " ")
2. Select the custom(Advanced) anc click next. Leave the Typical (recommended) configuration option, if you choose not to play around.
![img placeholder](/images/vsphere/esxi/002.png " ")
3. Choose *I will install operating system later* and click **Next**
![img placeholder](/images/vsphere/esxi/003.png " ")
4. Set the Guest OS as *VMware ESX*. Open the dropdown menu and choose **VMware ESXi 8 and  later**. Click Next to proceed. and click **Next**
![img placeholder](/images/vsphere/esxi/esx-001.png " ")
5. Provide the guest OS name (as you like) and installation location. Click Next to continue.
![img placeholder](/images/vsphere/esxi/esx-002.png " ")
6. Specify the number of processors and number of processor cores.
![img placeholder](/images/vsphere/esxi/esx-003.png " ")
7. Specify the memory size click Next to proceed.
![img placeholder](/images/vsphere/esxi/esx-004.png " ")
8. Specify the network type as do not use a network connection.
9. Select **paravirtualized SCSI** as I/O Controller type and click Next to proceed.
10. Select the Disk Type click Next to proceed. I have selected **SCSI**.

11. Select **create a new virtual disk**

12. Select **Store virtual disk as single file** and modify the disk size as **10GB**. and click on Next

13.  Click the Customize Hardware button, add new Network adapter. Repeat the same four times to add 4 Network adapters. change to LAN Segment
14. select the ESXi ISO Image. Click on Next and Finish

15. Power on the VM and boot
![img placeholder](/images/vsphere/esxi/esx-006.png " ")
![img placeholder](/images/vsphere/esxi/esx-007.png " ")
16. Press Enter to continue with the Installation
![img placeholder](/images/vsphere/esxi/esx-008.png " ")
17. Press F11 to Accept and continue
![img placeholder](/images/vsphere/esxi/esx-009.png " ")
18. Choose the Local Disk and Press Enter
![img placeholder](/images/vsphere/esxi/esx-010.png " ")
19. Enter the root password and press Enter
![img placeholder](/images/vsphere/esxi/esx-012.png " ")
20. Installation progress
![img placeholder](/images/vsphere/esxi/esx-013.png " ")
21. Press enter to reboot and complete the installation
![img placeholder](/images/vsphere/esxi/esx-014.png " ")
22. Press F2 and configure the IP address, as required
![img placeholder](/images/vsphere/esxi/esx-015.png " ")
23. access the IP address of ESXI and login with root and password
![img placeholder](/images/vsphere/esxi/esx-016.png " ")


