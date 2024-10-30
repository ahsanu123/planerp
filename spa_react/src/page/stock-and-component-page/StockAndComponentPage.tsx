import { observer } from "mobx-react-lite";
import { LinePlot } from "../../component/shared-component/line-plot/LinePlot";

const StockAndComponentPageComponent: React.FC = () => {
  return (
    <>
      <h2> Stock And Component Page</h2>
      <LinePlot />
    </>
  );
};
export const StockAndComponentPage = observer(StockAndComponentPageComponent);

