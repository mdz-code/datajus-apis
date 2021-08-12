const { createClient } = require('@supabase/supabase-js')

// Create a single supabase client for interacting with your database 
const supabase = createClient("https://xhgwthchxrmpybhztwuu.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyODU0MDY3MCwiZXhwIjoxOTQ0MTE2NjcwfQ.M6KiTISg4vZX54H7na6Eu8UTphLuE9FLD_6MhCTxPy8")

module.exports = async function queryBuilder(table, keyQuery, valueQuery, selectQuery=['*']) {
    const stringSelect = selectQuery.join(',')
    const { data, error } = await supabase.from(table).select(stringSelect).eq(keyQuery, valueQuery).limit(1)

    if (!error) {
        return data[0]
    }

    return {}

}