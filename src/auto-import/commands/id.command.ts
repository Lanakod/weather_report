import { ICommand } from "@interfaces";

const command: ICommand = {
  command: "id",
  hidden: true,
  description: "Get your id",
  callback: async (ctx) => {
    if (ctx.config.isOwner)
      await ctx.reply(`Bot id - "${ctx.me.id}\nYour id - ${ctx.from?.id}"`);
  },
};

export default command;
