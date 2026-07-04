# SimpliWiki - Personal Wiki

This is JeanHuguesRobert's personal wiki, formerly hosted at simpliwiki.com.

## Deployment on fracta

```bash
# Clone/update this repo on fracta
ssh fracta "cd /srv/SimpliWiki && git pull"

# The SimpliWiki engine runs from /srv/simpli
# This instance just provides the wiki content

# Service: simpliwiki-personal.service
# Port: 8081
# Domain: simpliwiki.fractavolta.com
```

## Content

- Source: ~/Dropbox/SimpliWiki (historical backup)
- Files: wiki/ directory (without .sii extension)
- Configuration: local-config.js

## Related

- SimpliJs Engine: simplijs.fractavolta.com
- SimpliWiki Personal: simpliwiki.fractavolta.com
