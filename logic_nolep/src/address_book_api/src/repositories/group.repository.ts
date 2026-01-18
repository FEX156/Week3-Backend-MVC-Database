import { pool } from "../db/pool";
import type { Group } from "../types/index.type";

export class GroupRepository {
  public static async createGroup(group_name: string): Promise<Group> {
    const result = await pool.query(
      `INSERT INTO groups (group_name) VALUES ($1) RETURNING *`,
      [group_name]
    );
    return result.rows[0];
  }

  public static async updateGroup(
    id: number,
    group_name: string
  ): Promise<Group> {
    const result = await pool.query(
      `UPDATE groups SET group_name = $2 
        WHERE group_id = $1 
        RETURNING *`,
      [id, group_name]
    );

    return result.rows[0];
  }

  public static async deleteGroup(id: number): Promise<boolean> {
    const result = await pool.query(`DELETE FROM groups WHERE group_id = $1`, [
      id,
    ]);

    return result.rowCount === 1;
  }

  public static async showGroups(): Promise<Group[]> {
    const allResult = await pool.query(`SELECT
  g.group_id,
  g.group_name,
  COALESCE(
    json_object_agg(c.name, c.phone)
      FILTER (WHERE c.name IS NOT NULL),
    '{}'
  ) AS contacts
FROM groups g
LEFT JOIN contact_groups cg ON g.group_id = cg.group_id
LEFT JOIN contacts c ON cg.contact_id = c.contact_id
GROUP BY g.group_id, g.group_name
ORDER BY g.group_id
`);

    return allResult.rows;
  }
}
