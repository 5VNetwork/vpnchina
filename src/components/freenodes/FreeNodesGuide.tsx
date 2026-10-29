export function FreeNodesGuide() {
  return (
    <section
      className="mb-8 rounded-xl border border-line bg-white/60 p-5"
      aria-labelledby="free-nodes-guide-title"
    >
      <h2
        id="free-nodes-guide-title"
        className="text-lg font-semibold text-ink"
      >
        使用说明
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        以上免费节点由本站整理后提供，仅供学习与交流网络技术使用。免费节点的速度与稳定性会随时间、人数与线路变化；若连接异常或失效，登录后可点击「刷新节点」获取最新配置。
      </p>

      <h3 className="mt-5 text-base font-semibold text-ink">
        导入{" "}
        <a
          href="https://vx.5vnetwork.com/zh"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand underline-offset-4 hover:underline"
        >
          VX 客户端
        </a>
      </h3>
      <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted">
        <li>
          先安装并打开 VX 客户端（手机或电脑）。建议在已安装 VX 的设备上用浏览器打开本页。
        </li>
        <li>
          登录本页后，在「订阅连接」或「节点」区域点击「直接导入客户端」，选择
          VX；浏览器会尝试唤起应用并写入配置。
        </li>
        <li>
          若未自动跳转，可改用「复制订阅链接」或「复制全部」，再到 VX
          内手动添加订阅或从剪贴板导入节点。图文步骤见{" "}
          <a
            href="https://vxdoc.5vnetwork.com/zh/docs/tutorials/import-subscription"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand underline-offset-4 hover:underline"
          >
            VX 导入订阅教程
          </a>
          。
        </li>
        <li>
          也可点击「显示二维码」，用另一台设备上的 VX 扫码导入订阅或节点。
        </li>
        <li>导入后在客户端选择节点并连接；若失败，回到本页刷新节点后重试。</li>
      </ol>

      <h3 className="mt-5 text-base font-semibold text-ink">使用建议</h3>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted">
        <li>
          可直接导入节点，或将订阅链接导入客户端，由客户端自行拉取并更新。
        </li>
        <li>请不要向他人分享节点或订阅链接。</li>
      </ul>
    </section>
  );
}
