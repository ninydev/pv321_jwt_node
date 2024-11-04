using System;
using System.Net;
using System.Text;

class Program
{
    static void Main()
    {
        int port = 5000; // Укажите желаемый порт
        var listener = new HttpListener();
        listener.Prefixes.Add($"http://*:{port}/");
        listener.Start();

        Console.WriteLine($"Сервер запущен на http://localhost:{port}. Нажмите Ctrl+C для остановки.");

        while (true)
        {
            var context = listener.GetContext();
            var response = context.Response;

            string responseString = $"Current server time: {DateTime.Now}";
            Console.WriteLine(responseString);
            byte[] buffer = Encoding.UTF8.GetBytes(responseString);

            response.ContentLength64 = buffer.Length;
            response.OutputStream.Write(buffer, 0, buffer.Length);
            response.OutputStream.Close();
        }
    }
}
