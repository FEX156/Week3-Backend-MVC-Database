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
            json_agg(
            json_build_object(
                'name', c.name,
                'phone', c.phone
            )
            ) FILTER (WHERE c.name IS NOT NULL),
            '[]'
        ) AS contacts
        M groups g
        T JOIN contact_groups cg ON g.group_id = cg.    up_id
        T JOIN contacts c ON cg.contact_id = c.     tact_id
        UP BY g.group_id
        ER BY g.group_id;`);

    return allResult.rows;
  }
}
