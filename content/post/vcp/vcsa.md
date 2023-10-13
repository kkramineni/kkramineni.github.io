+++
author = "Kishore"
title = "How to Install VMware VCSA - Nested Lab"
date = "2023-10-11"
description = ""
tags = [
    "VMware Workstation",
    "Linux",
    "vsphere/vcsa",
    "Home Lab",
]
categories = "VMware"

+++

This post is part of VMware vShere How to hands-on training that focuses on installing, configuring, and managing VMware vSphere 8, which includes VMware VCSA8 and VMware vCenter8. This course prepares you to administer a vSphere infrastructure for an organization of any size.



##### Ensure the DNS entry is available in DNS Server
![img placeholder](/images/vsphere/vcsa/dns-001.png " ")

### Step1: Import VCSA OVF
In Windows, mount the VCSA ISO, go to Mount drive ( In my case its *G:* ). go to vcsa folder and double-click on VCSA OVF
![img placeholder](/images/vsphere/vcsa/vcsa_iso.png " ")

1. Click on I accept the terms of license agreement
![img placeholder](/images/vsphere/vcsa/vcsa-001.png " ")
2. enter the VM name (in my case vcsa8)
![img placeholder](/images/vsphere/vcsa/vcsa-002.png " ")
3. select the Tiny vCenter Server with Embedded PSC and Click on Next
![img placeholder](/images/vsphere/vcsa/vcsa-003.png " ")
4. Provide the network configuration, as per the lab config and Click on Next
![img placeholder](/images/vsphere/vcsa/vcsa-004.png " ")
5. Enter the SSO Password
![img placeholder](/images/vsphere/vcsa/vcsa-005.png " ")
6. Enter the root Password
![img placeholder](/images/vsphere/vcsa/vcsa-006.png " ")
7. Provide the FQDN and Domain Search Path
![img placeholder](/images/vsphere/vcsa/vcsa-007.png " ")
8. Wait for the completion OVF import into workstation
![img placeholder](/images/vsphere/vcsa/vcsa-008.png " ")
9. Change the network adapter connection to "LAN Segment"
![img placeholder](/images/vsphere/vcsa/vcsa-009.png " ")
10. Post completion, wait for the boot completion and access the IP and Port 5480 e.g: https://192.168.20.49:5480
![img placeholder](/images/vsphere/vcsa/vcsa-010.png " ")
11. Login to Appliance using the root credentials
![img placeholder](/images/vsphere/vcsa/vcsa-011.png " ")
12. Wait for the installation to finish
![img placeholder](/images/vsphere/vcsa/vcsa-012.png " ")
13.  Click on Next in the Stage2 of the installation
![img placeholder](/images/vsphere/vcsa/vcsa-013.png " ")
14. validate the details, and modify if necessary and click on Next
![img placeholder](/images/vsphere/vcsa/vcsa-014.png " ")
15. provide the SSO domain name and SSO Password and click on Next
![img placeholder](/images/vsphere/vcsa/vcsa-015.png " ")
16. Wait for the installation to complete
![img placeholder](/images/vsphere/vcsa/vcsa-016.png " ")
17. Installtion is Complete Now. The vCenter Server can be accessed with Given IP/URL
![img placeholder](/images/vsphere/vcsa/vcsa-017.png " ")


