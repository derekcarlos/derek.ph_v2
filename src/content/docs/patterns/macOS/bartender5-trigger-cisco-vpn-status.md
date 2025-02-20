---
title: Bartender 5 Trigger for Cisco Secure Connect VPN Status
---

I use Bartender as a fantastic tool to manage my menu bar items and one of the things I want to manage is my Cisco Secure Connect VPN.

If I am connected to the VPN, I want to make sure that I see the Cisco Secure Client VPN's icon so that I don't hog my company's VPN bandwidth with non-work-related web traffic. But I still want to hide it if I am not using it.

First I need to create a script in my home directory called `vpnStat.sh`:

```bash title="vpnStat.sh"
status=$(/opt/cisco/secureclient/bin/vpn status | grep -m 2 'state: ' | tail -n 1)

if [[ $status == *'state: Disconnected'* ]]; then
    echo 0
else
    echo 1
fi
```

In Bartender, if the return code is `0`, it means false, and `1` is true. I saved the script and set the appropriate permissions, then went to Bartender 5 settings.

Under *Triggers*, click that obnoxiously big plus button, name the trigger as "Show Cisco VPN when Connected". Then under *Show Menu Bar Items* I picked **Cisco Secure Client**. After that, I clicked Add Trigger Condition and picked **Script** from the options and typed the absolute path of the `vpnStat.sh`.

All done! Of course, make sure to click "Done" after all that and make sure it's enabled.