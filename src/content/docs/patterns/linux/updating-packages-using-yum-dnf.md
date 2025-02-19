---
title: Updating Packages using YUM/DNF
---

After years of using RHEL/Oracle Linux at work, I just realized that I can update my packages through `yum` or `dnf` if I add the repo file of said packages to the `/etc/yum.repos.d`.

This may look like a pretty basic knowledge to some, but it's an amazing gift to me. I never had a formal training on Red Hat or Oracle Linux and I only learned some basic Solaris administration back in college, so it only dawned on me when I needed to install Jenkins, InfluxDB and Grafana on my Linux boxes.

The typical problem that I have is that my organization can be very strict with us updating our packages to the latest update for security purposes, and since I installed my packages manually (e.g. downloading JAR file from the website, extracting it to the file system, creating startup scripts using `systemd`) I had to do it all over again every time there's an update.

But when I started developing Ansible playbook to streamline my installs, I realized that Jenkins, InfluxDB, and Grafana have repo files I can add to `/etc/yum.repos.d` directory. At first I only noticed the simplicity of doing this in Ansible, but I later realized that there's more than I initially thought. By adding these repository files to the `/etc/yum.repos.d` directory, Oracle Linux now knows where the updates are coming from, and so if I run `sudo yum update` (or `sudo dnf update` now because apparently `yum` is already deprecated and it's only pointing to `dnf`), it automatically updates these packages even if they are not part of the official Oracle Linux repositories.

I was humbled by this discovery.

## Adding a Repository Manually

To enable automatic updates for a package not included in Oracle Linux’s official repositories, you need to add a .repofile under /etc/yum.repos.d/. Here’s how you can manually add one:

### Example: Adding the Grafana Repository

Create a new file /etc/yum.repos.d/grafana.repo with the following content:

```ini
[grafana]
name=Grafana Repository
baseurl=https://packages.grafana.com/oss/rpm
enabled=1
gpgcheck=1
gpgkey=https://packages.grafana.com/gpg.key
```

### Importing the GPG Key

To verify the package integrity, import the GPG Key:

```sh
sudo rpm --import https://packages.grafana.com/gpg.key
```

Oracle Linux now knows how to fetch and verify Grafana updates automatically.

---

## Checking for Available Updates

Before applying updates, it’s good practice to check what’s available:

```sh
sudo yum check-update
```

or

```sh
sudo dnf check-update
```

This lists all available updates, including those from third-party repositories you’ve added.

---

## Updating Packages

To update all installed packages, simply run:

```sh
sudo yum update -y
```

or

```sh
sudo dnf upgrade -y
```

If you only want to update a specific package (e.g. `grafana`):

```sh
sudo yum update grafana
```

or

```sh
sudo dnf upgrade grafana
```

---

## Automating Updates with Ansible

Since I use Ansible for automation, I integrated package updates into my playbooks. Here's a simple example of how to ensure Grafana is installed and always up to date:

```yaml
- name: Import Grafana GPG key
  ansible.builtin.rpm_key:
    state: present
    key: "{{ grafana_private_key_file }}"
  become: true

- name: Copy the grafana.repo file to /etc/yum.repos.d
  ansible.builtin.copy:
    src: grafana.repo
    dest: /etc/yum.repos.d/grafana.repo
    owner: root
    group: root
    mode: '0644'
  become: true

- name: Install Grafana
  yum:
    name: grafana
    state: latest
  become: true
```

This way, every time I run the playbook, Grafana gets updated without me having to manually download and configure it again.

---

## Conclusion

Discovering the power of YUM/DNF repositories was a game-changer for me. Manual updates are a thing of the past. Now, I can simply add a repository, check for updates, and keep everything up to date with a single command.

More importantly, integrating this into my Ansible playbooks has made my deployments repeatable, consistent, and scalable.