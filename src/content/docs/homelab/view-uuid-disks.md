---
title: "View UUIDs for all disks in system"
---

I remember somewhere that it's always better to mount disks through their UUIDs rather than on their `dev` block (e.g. `/dev/sdb1`) as this usually changes around. So here are the ways to check for the UUID of a specific `dev` block.

## 1. `lsblk -f`

```bash
derek@fc-pms-01:~$ lsblk -f
NAME                      FSTYPE      FSVER    LABEL UUID                                   FSAVAIL FSUSE% MOUNTPOINTS
sda
├─sda1
├─sda2                    ext4        1.0            a62d2a4b-524d-476c-9fd7-8950a52ad5d0      1.5G     5% /boot
└─sda3                    LVM2_member LVM2 001       KakH0Y-DXgY-dxkZ-K3av-vcQl-hWCO-2J0QoT
  └─ubuntu--vg-ubuntu--lv ext4        1.0            834b46e0-b328-40c0-8afe-6e27c6f11241      4.7G    46% /
sdc
└─sdc1                    ext4        1.0            7ff93295-2379-43a2-9419-7ab733d584be     13.9G    24% /plexdata

```

## 2. `/dev/disk/by-uuid`

```bash
derek@fc-pms-01:~$ ls -lha /dev/disk/by-uuid
total 0
drwxr-xr-x 2 root root 100 Nov 20 04:49 .
drwxr-xr-x 8 root root 160 Nov 20 01:49 ..
lrwxrwxrwx 1 root root  10 Nov 20 02:55 7ff93295-2379-43a2-9419-7ab733d584be -> ../../sdc1
lrwxrwxrwx 1 root root  10 Nov 20 01:49 834b46e0-b328-40c0-8afe-6e27c6f11241 -> ../../dm-0
lrwxrwxrwx 1 root root  10 Nov 20 01:49 a62d2a4b-524d-476c-9fd7-8950a52ad5d0 -> ../../sda2
```

When the UUID has been identified, mount them through the `/etc/fstab`:

```bash
UUID="7ff93295-2379-43a2-9419-7ab733d584be" /plexdata ext4 defaults,auto,exec,_netdev,nofail 0 0
```