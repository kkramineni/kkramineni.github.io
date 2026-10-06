+++
title = "How to Install and Configure Ansible AWX on Rocky Linux 8"
description = "Deploying the AWX operator into a K3s cluster with Kustomize, then creating an AWX instance as a NodePort service."
date = "2023-10-08"
author = "Kishore"
tags = ["AWX", "Automation", "Linux", "Ansible", "Home Lab"]
categories = "Automation"
thumbnail = "/images/awx/awx_logo.png"
+++

AWX — "Ansible Web eXecutable" — is a free, open-source project for managing and controlling Ansible projects. It provides a web UI and a REST API, and can sync inventory from other sources. It's the upstream project behind Red Hat's Ansible Automation Platform.

Ansible itself is the task engine; AWX is the web interface for scheduling and running playbooks against the inventories those playbooks act on.

In this post I'll install the AWX operator on Rocky Linux 8 and deploy an instance into a K3s cluster.

## Prerequisites

{{% notice tip "Steps involved" %}}

1. A Rocky Linux 8.x or CentOS 8.x server with at least 4 GB RAM
2. A running K3s cluster
3. The AWX operator deployed into that cluster

{{% /notice %}}

For K3s installation, see [Install K3S](/post/containers/k3s/k3s-01/).

## Install the AWX operator

Install the prerequisites:

```shell
sudo yum -y install git make
```

![Installing prerequisites](/images/awx/awx_001.png)

With a running Kubernetes cluster — K3s in this case — you can deploy the AWX operator using [Kustomize](https://kubectl.docs.kubernetes.io/guides/introduction/kustomize/).

Create a file called **kustomization.yaml**:

```shell
vi kustomization.yaml
```

Check the [awx-operator releases](https://github.com/ansible/awx-operator/releases) page for the latest tag — 2.6.0 is used here:

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - github.com/ansible/awx-operator/config/default?ref=2.6.0
images:
  - name: quay.io/ansible/awx-operator
    newTag: 2.6.0
namespace: awx
```

![The kustomization.yaml file](/images/awx/awx_002.png)

Apply the manifests:

```shell
kubectl apply -k .
```

![Applying the manifests](/images/awx/awx_003.png)

Wait until the awx-operator is running, then check:

```shell
kubectl get pods -n awx
```

## Create an AWX instance

Create a file called **awx-lab.yaml**:

```shell
vi awx-lab.yaml
```

```yaml
---
apiVersion: awx.ansible.com/v1beta1
kind: AWX
metadata:
  name: awx-demo
spec:
  service_type: nodeport
```

![The awx-lab.yaml file](/images/awx/awx_004.png)

Add that file to the `resources` list in **kustomization.yaml**:

```yaml
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

![The updated kustomization.yaml](/images/awx/awx_005.png)

Apply the changes to create the AWX instance. Since you're done passing `-n awx`, set it as the current namespace:

```shell
kubectl config set-context --current --namespace=awx
```

```shell
kubectl apply -k .
```

## Verify the deployment

After a few minutes the instance is deployed. Follow the logs to watch the install progress:

```shell
kubectl logs -f deployments/awx-operator-controller-manager -c awx-manager
```

Within a few seconds the operator should begin creating resources:

```shell
kubectl get pods -l "app.kubernetes.io/managed-by=awx-operator"
```

![Pods managed by the AWX operator](/images/awx/awx_007.png)

Get the NodePort details:

```shell
kubectl get svc -l "app.kubernetes.io/managed-by=awx-operator"
```

![Service details including the NodePort](/images/awx/awx_008.png)

By default the admin username is `admin`, and the password is stored in the `<resourcename>-admin-password` secret:

```shell
kubectl get secret awx-demo-admin-password -o jsonpath="{.data.password}" | base64 --decode ; echo
```

![Retrieving the admin password](/images/awx/awx_009.png)

Open `http://<hostname>:<port>` and log in with `admin` and that password.

![The AWX login page](/images/awx/awx_010.png)

## Watch the video

Setting up the AWX operator in a K3s cluster:

{{< youtube zlLKCb4DdEw >}}
