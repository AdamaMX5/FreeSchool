package db.migration;

import org.flywaydb.core.api.migration.BaseJavaMigration;
import org.flywaydb.core.api.migration.Context;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.SingleConnectionDataSource;


/**
 * Create the app_setting table.
 */
public class V003__CreateAppSettingTable extends BaseJavaMigration {
    @Override
    public void migrate(Context context) {
        final JdbcTemplate jdbcTemplate = new JdbcTemplate(
                new SingleConnectionDataSource(context.getConnection(), true));
        jdbcTemplate.execute("CREATE TABLE app_setting (name VARCHAR(255) PRIMARY KEY, the_value VARCHAR(255))");
    }
}
