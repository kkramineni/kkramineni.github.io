+++
author = "Kishore"
title = "How to Install and Configure Ansible AWX on Rocky Linux 8"
date = "2023-10-08"
description = ""
tags = [
    "AWX",
    "Automation",
    "Linux",
    "Ansible",
    "Home Lab",
]
categories = "Automation"
thumbnail = "/images/awx/awx_logo.png"
+++

AWX stands for “Ansible Web eXecutable” is a free and open-source project that allows you to easily manage and control Ansible projects. AWX is the upstream project of Red Hat Ansible Automation Platform. AWX provides a web-based user interface, a powerful REST API and allows to manage or sync inventory with other cloud sources
### Install AWX Operator Installtion on K3S
![img placeholder](/images/awx/awx_logo.png " ")

The open source projects Ansible and AWX, is a task engine and Web interface for scheduling and running playbook tasks on the inventories the playbooks interact with.

In this tutorial, we will install and configure Ansible AWX operator on Rocky Linux 8

{{% notice tip "Steps involved" %}}
1. Install Rocky Linux 8.x or CentOS 8.x server with a minimum of 4 GB RAM.
2. Install K3S
3. Install AWX operator on K3s
{{% /notice %}}

Refer to this post for K3S installation <a href="https://cloudbricks.dev/post/containers/k3s/k3s-01/">Install K3S</a>


Once we have a running kubernetes cluster( in this case K3s), we can deploy AWX Operator into the cluster using <a href= "https://kubectl.docs.kubernetes.io/guides/introduction/kustomize/"> Kustomize. </a>

### Install AWX Operator:

Install pre-requisites with the following command

```shell
sudo yum -y install git make
```

![img placeholder](/images/awx/awx_001.png " ")


Manually create a file called **kustomization.yaml** with the following content:

```shell
vi kustomization.yaml
```
Find the latest tag here: https://github.com/ansible/awx-operator/releases. *In this case, I have used 2.6.0*

```shell
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - github.com/ansible/awx-operator/config/default?ref=2.6.0
images:
  - name: quay.io/ansible/awx-operator
    newTag: 2.6.0
namespace: awx
```

![img placeholder](/images/awx/awx_002.png " ")

Install the manifests by running this

``` shell
kubectl apply -k .
```
![img placeholder](/images/awx/awx_003.png " ")
Wait a bit until the awx-operator running. we can check this by running

```shell
kubectl get pods -n awx
```

Manually create a file called **awx-lab.yaml**
```shell
vi awx-lab.yaml
```
in awx-lab.yaml, copy the below content
```shell
---
apiVersion: awx.ansible.com/v1beta1
kind: AWX
metadata:
  name: awx-demo
spec:
  service_type: nodeport
```

![img placeholder](/images/awx/awx_004.png " ")

Make sure to add this new file to the list of "resources" in  **kustomization.yaml** file

```shell
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - github.com/ansible/awx-operator/config/default?ref=2.6.0
  - awx-lab.yaml
images:
  - name: quay.io/ansible/awx-operator
    newTag: 2.6.0
namespace: awx
```
![img placeholder](/images/awx/awx_005.png " ")

Finally, apply the changes to create the AWX instance in the cluster

``` shell
kubectl apply -k .
```
After few minutes, the new AWX instance will be deployed. we can check the logs using the following command, in order to know where the installation process is at
```
kubectl logs -f deployments/awx-operator-controller-manager -c awx-manager
```


After few seconds, we should see the operator begin to create new resources
```
kubectl get pods -l "app.kubernetes.io/managed-by=awx-operator"
```
![img placeholder](/images/awx/awx_007.png " ")


Get the Node port details by running the following command
```
kubectl get svc -l "app.kubernetes.io/managed-by=awx-operator"
```
![img placeholder](/images/awx/awx_008.png " ")

By default, the admin user is admin and the password is available in the <resourcename>-admin-password secret. To retrieve the admin password, run

```
kubectl get secret awx-demo-admin-password -o jsonpath="{.data.password}" | base64 --decode ; echo
```

![img placeholder](/images/awx/awx_009.png " ")

Launch the URL using the <<hostname:port>>, and login the with admin/password noted with above command

![img placeholder](/images/awx/awx_010.png " ")

### Watch the video on How to Setup AWX Operator in K3S cluster

{{< youtube zlLKCb4DdEw >}}

<br>
