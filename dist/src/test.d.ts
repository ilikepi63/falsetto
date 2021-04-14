/** Ideally this is the outcome that we want:
 *
 *  Schema.insert({data});
 *
 *  -- inserts into all of the different query tables that were defined from this insert
 *
 *  Schema.query({email = "cameron@x.com"})
 *  -- should be able to query it.
 *
 *
 */ 
