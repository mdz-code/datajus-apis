const { createClient } = require('@supabase/supabase-js')

class SupabaseModel {
    supabase

    constructor() {
        this.supabase = createClient("https://xhgwthchxrmpybhztwuu.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyODU0MDY3MCwiZXhwIjoxOTQ0MTE2NjcwfQ.M6KiTISg4vZX54H7na6Eu8UTphLuE9FLD_6MhCTxPy8")
    }

    async queryBuilder(table, keyQuery, valueQuery, selectQuery=['*'], limit=1) {
        const stringSelect = selectQuery.join(',')
        const { data, error } = await this.supabase.from(table).select(stringSelect).eq(keyQuery, valueQuery).limit(limit)
        if (!error) {
            return limit === 1 ? data[0] : data
        }
    
        return {}
    
    }

    async insertValue(table, arrayInsert) {
        const { data, error } = await this.supabase.from(table).insert(arrayInsert)
    
        if (!error) {
            return data[0]
        }
    
        return {}
    }
}

module.exports = new SupabaseModel()