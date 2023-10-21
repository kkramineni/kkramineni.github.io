+++
author = "Kishore"
title = "How to Create a Rocky Linux Server Template in VMware - Manual"
date = "2023-09-23"
description = ""
tags = [
    "VMware",
    "Linux",
    "Rocky Linux",
    "Home Lab",
]
thumbnail = "/images/Rocky_Linux.png"
+++

## Rocky Linux Server Template creation for Home Lab

### Step1: Create VM
In VMware workstation,

1. Go to File -> Select New Virtual Mahine to create a VM
![img placeholder](/images/rocky/001.png " ")
2. Select the custom(Advanced) anc click next. Leave the Typical (recommended) configuration option, if you choose not to play around.
![img placeholder](/images/rocky/002.png " ")
3. Choose *I will install operating system later* and click **Next**
![img placeholder](/images/rocky/003.png " ")
4. Set the Guest OS as Linux. Open the dropdown menu and choose **Rocky Linux** for the version. Click Next to proceed. and click **Next**
![img placeholder](/images/rocky/004.png " ")
5. Provide the guest OS name (as you like) and installation location. Click Next to continue.
![img placeholder](/images/rocky/005.png " ")
6. Specify the number of processors and number of processor cores.
![img placeholder](/images/rocky/006.png " ")
7. Specify the memory size click Next to proceed.
![img placeholder](/images/rocky/007.png " ")
8. Specify the network type size click Next to proceed.
![img placeholder](/images/rocky/008.png " ")
9. Select **LSI Logic** as I/O Controller type and click Next to proceed.
![img placeholder](/images/rocky/009.png " ")
10. Select the Disk Type click Next to proceed. I have selected **NVMe**. You can choose appropriate based on your environment
![img placeholder](/images/rocky/010.png " ")
11. Select **create a new virtual disk**
![img placeholder](/images/rocky/011.png " ")
12. Select **Store virtual disk as single file** and modify the disk size as **200GB**. and click on Next
![img placeholder](/images/rocky/012.png " ")
13.  Click the Customize Hardware button, to modify any settings.
![img placeholder](/images/rocky/013.png " ")
![img placeholder](/images/rocky/014.png " ")

The final creation page allows customizing the hardware options for the virtual machine. Click the Customize Hardware button. And remove the printer, Sound card select the OS ISO Image etc.. non required devices
![img placeholder](/images/rocky/015.png " ")
Once done with Customisation, click on Power On
![img placeholder](/images/rocky/016.png " ")

### Step2: Install Operating System

1. Use the arrow keys and select Install Rocky Linux
![img placeholder](/images/rocky/017.png " ")
2. Choose the Keyboard Layout and click on continue
![img placeholder](/images/rocky/018.png " ")
3. Select the Time Zone and Date as per your requirement
![img placeholder](/images/rocky/019.png " ")
4. Choose installation destination to create Linux File System and select custom *Storage Cofiguration*
![img placeholder](/images/rocky/020.png " ")
5. Modfy the partition sizes as required
![img placeholder](/images/rocky/021.png " ")
![img placeholder](/images/rocky/022.png " ")
![img placeholder](/images/rocky/023.png " ")
6. Enter Strong Password for root user account. You can also create other user accounts
![img placeholder](/images/rocky/025.png " ")
7. Select ***Minimal Install*** as software selection
![img placeholder](/images/rocky/024.png " ")
8. Enable the network connection
![img placeholder](/images/rocky/026.png " ")
9. Click on ***Begin Installation*** to proceed with the installation
![img placeholder](/images/rocky/027.png " ")
10. After completion of installation, click on Reboot System
11. Login to the server using root credentials and install open-vm-tools packages
```
dnf install open-vm-tools -y
```
![img placeholder](/images/rocky/028.png " ")

### Watch the video on How to create a Rocky Linux Server template in VMware workstation

{{< youtube S9eJ840lFd0 >}}

<br>