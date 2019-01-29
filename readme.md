# Install
```bash
$ npm add verifytx-node
```
# Usage
```js
import { VerifyTX } from "verifytx-node"

VerifyTX.getInstance().authorize({
	...options
});
```
# Documentation
https://docs.dev.verifytx.com

## API
>
> <a name="api-VerifyTX"></a>
> ### Class [`VerifyTX`](#api-VerifyTX)
> Source code:  
>  
> Methods:  
> > **.view( )** <sup>&rArr; <code>Promise&lt;any&gt;</code></sup>  
> > &emsp;<em>View vob</em>  
> > &emsp;&#x25aa; id <sup><code>string</code></sup> <em>vob id</em>  
> > **.vobs( )** <sup>&rArr; <code>Promise&lt;any&gt;</code></sup>  
> > &emsp;<em>Get vobs</em>  
> > &emsp;&#x25aa; filter <sup><code>any</code></sup>  
> > **.update( )** <sup>&rArr; <code>Promise&lt;any&gt;</code></sup>  
> > &emsp;&#x25aa; id <sup><code>string</code></sup>  
> > &emsp;&#x25aa; data <sup><code>object</code></sup>  
> > **.delete( )** <sup>&rArr; <code>Promise&lt;any&gt;</code></sup>  
> > &emsp;<em>Delete vob</em>  
> > &emsp;&#x25aa; id <sup><code>string</code></sup> <em>vob id</em>  
> > **.reverify( )** <sup>&rArr; <code>Promise&lt;any&gt;</code></sup>  
> > &emsp;<em>Reverify Vob</em>  
> > &emsp;&#x25aa; id <sup><code>string</code></sup> <em>reverify vob</em>  
> > **.verify( )** <sup>&rArr; <code>Promise&lt;any&gt;</code></sup>  
> > &emsp;<em>Request a new VOB</em>  
> > &emsp;&#x25aa; data <sup><code>object</code></sup> <em>VOB data</em>  
> > **.history( )** <sup>&rArr; <code>Promise&lt;any&gt;</code></sup>  
> > &emsp;<em>View vob coverage history</em>  
> > &emsp;&#x25aa; id <sup><code>string</code></sup> <em>vob id</em>  
> > **.relations( )** <sup>&rArr; <code>Promise&lt;any&gt;</code></sup>  
> > &emsp;<em>Available relations</em>  
> > **.providers( )** <sup>&rArr; <code>Promise&lt;any&gt;</code></sup>  
> > &emsp;<em>Get available providers</em>  
> > &emsp;&#x25ab; search<sub>?</sub> <sup><code>string</code></sup> <em>optional provider search</em>  
> > **.authorize( )** <sup>&rArr; <code>Promise&lt;IAuthorize&gt;</code></sup>  
> > &emsp;<em>Authorize api requests</em>  
> > &emsp;&#x25aa; options <sup><code>IOptions</code></sup>  
> > **.refresh( )** <sup>&rArr; <code>Promise&lt;IAuthorize&gt;</code></sup>  
> > &emsp;<em>Refresh access token</em>  
