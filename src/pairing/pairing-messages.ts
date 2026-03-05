import { formatCliCommand } from "../cli/command-format.js";
import type { PairingChannel } from "./pairing-store.js";

export function buildPairingReply(params: {
  channel: PairingChannel;
  idLine: string;
  code: string;
}): string {
  const { channel, idLine, code } = params;
  if (channel === "telegram") {
    return [
      "OpenClaw: доступ к боту не настроен.",
      "",
      idLine,
      "",
      `Код подтверждения: ${code}`,
      "",
      "Что нужно сделать:",
      "1) Передайте этот код владельцу бота.",
      "2) Владелец вставит токен бота в dashboard/channels (если еще не настроен).",
      "3) Владелец подтвердит код командой:",
      formatCliCommand(`openclaw pairing approve ${channel} ${code}`),
    ].join("\n");
  }
  return [
    "OpenClaw: access not configured.",
    "",
    idLine,
    "",
    `Pairing code: ${code}`,
    "",
    "Ask the bot owner to approve with:",
    formatCliCommand(`openclaw pairing approve ${channel} ${code}`),
  ].join("\n");
}
