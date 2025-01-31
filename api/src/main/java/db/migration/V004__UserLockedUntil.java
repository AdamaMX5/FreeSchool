package db.migration;

import org.flywaydb.core.api.migration.BaseJavaMigration;
import org.flywaydb.core.api.migration.Context;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.SingleConnectionDataSource;

public class V004__UserLockedUntil extends BaseJavaMigration {

    @Override
    public void migrate(Context context) {
        final JdbcTemplate jdbcTemplate = new JdbcTemplate(
                new SingleConnectionDataSource(context.getConnection(), true));

        jdbcTemplate.execute("ALTER TABLE users ADD COLUMN locked_until DATETIME(6)");

    }
}
