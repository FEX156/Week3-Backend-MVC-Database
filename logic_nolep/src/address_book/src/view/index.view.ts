import chalk from "chalk";

export class ConsoleView {
  private static showHeader() {
    console.log(
      chalk.cyanBright(`
====================
ADDRESS BOOK COMMAND
====================
`)
    );
  }

  public static showHelp() {
    this.showHeader();

    console.log(chalk.yellowBright("Usage:\n"));

    console.log(
      chalk.white(
        "> npm start createContact <name> <phoneNumber> <company> <email>"
      )
    );
    console.log(
      chalk.white(
        "> npm start updateContact <id> <name> <phoneNumber> <company> <email>"
      )
    );
    console.log(chalk.white("> npm start deleteContact <id>"));
    console.log(chalk.white("> npm start showContacts\n"));

    console.log(chalk.white("> npm start createGroup <groupName>"));
    console.log(chalk.white("> npm start updateGroup <id> <groupName>"));
    console.log(chalk.white("> npm start deleteGroup <id>"));
    console.log(chalk.white("> npm start showGroups\n"));

    console.log(
      chalk.white("> npm start createContactGroup <contactId> <groupId>")
    );
    console.log(
      chalk.white("> npm start updateContactGroup <id> <contactId> <groupId>")
    );
    console.log(chalk.white("> npm start deleteContactGroup <id>\n"));

    console.log(chalk.white("> npm start help"));
  }

  public static showSuccess(message: string) {
    console.log(chalk.greenBright("✔ SUCCESS"));
    console.log(chalk.green(message));
  }

  public static showTable<T extends object>(data: T[]) {
    if (data.length === 0) {
      console.log(chalk.yellow("No data found."));
    }

    console.table(data);
  }

  public static showError(message: string) {
    console.error(chalk.redBright("✖ ERROR"));
    console.error(chalk.red(message));
    return;
  }
}
