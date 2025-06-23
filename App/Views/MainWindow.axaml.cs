using Avalonia.Markup.Xaml;
using Avalonia.ReactiveUI;
using Bricker.ViewModels;
using ReactiveUI;

namespace Bricker.Views;

public partial class MainWindow : ReactiveWindow<MainWindowViewModel>
{
    public MainWindow()
    {
        this.WhenActivated(disposable => { });
        AvaloniaXamlLoader.Load(this);
    }
}
